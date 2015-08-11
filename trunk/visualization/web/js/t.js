{
   "_id": "_design/aware",
   "_rev": "2-0905fd6507b32011c1b96a76d2cf4ff2",
   "views": {
      "serviceOperationByYear": {
         "map": "function (doc) {\r\n    if (doc.observation.detail.state === 'END' && doc.observation.detail.name === 'Operation' && doc.observation.time && doc.observation.detail.duration && doc.observation.detail.serviceName && doc.observation.detail.serviceOperation && doc.observation.detail.status) {\r\n        var d = new Date(Date.parse(doc.observation.time));\r\n\r\n        emit([d.getFullYear(), doc.observation.detail.serviceName, doc.observation.detail.serviceOperation, d.getMonth() + 1, doc.observation.detail.status], Number(doc.observation.detail.duration));\r\n    }\r\n}\r\n",
         "reduce": "_stats"
      },
      "serviceOperationByMonth": {
         "map": "function (doc) {\r\n    if (doc.observation.detail.state === 'END' && doc.observation.detail.name === 'Operation' && doc.observation.time && doc.observation.detail.duration && doc.observation.detail.serviceName && doc.observation.detail.serviceOperation && doc.observation.detail.status) {\r\n        var d = new Date(Date.parse(doc.observation.time));\r\n\r\n        emit([d.getFullYear(), d.getMonth() + 1, doc.observation.detail.serviceName, doc.observation.detail.serviceOperation, d.getDate(), doc.observation.detail.status], Number(doc.observation.detail.duration));\r\n    }\r\n}\r\n",
         "reduce": "_stats"
      },
      "serviceOperationByDay": {
         "map": "function (doc) {\r\n    if (doc.observation.detail.state === 'END' && doc.observation.detail.name === 'Operation' && doc.observation.time && doc.observation.detail.duration && doc.observation.detail.serviceName && doc.observation.detail.serviceOperation && doc.observation.detail.status) {\r\n        var d = new Date(Date.parse(doc.observation.time));\r\n\r\n        emit([d.getFullYear(), d.getMonth() + 1, d.getDate(), doc.observation.detail.serviceName, doc.observation.detail.serviceOperation, d.getHours(), doc.observation.detail.status, doc.observation.globalId], Number(doc.observation.detail.duration));\r\n    }\r\n}\r\n",
         "reduce": "_stats"
      }
   },
   "language": "javascript",
   "indexes": {
      "observation": {
         "analyzer": "standard",
         "index": "function(doc){\n index(\"serviceName\", doc.observation.detail.serviceName, {facet: true, store: true});\n index(\"serviceOperation\", doc.observation.detail.serviceOperation, {facet: true, store: true});\n index(\"state\", doc.observation.detail.state, {facet: true});\n index(\"time\", doc.observation.time, {facet: true});\n index(\"timeT\", Date.parse(doc.observation.time), {facet: true, store: true});\n}"
      }
   },
   "lists": {
      "uiByDay": "function (head, req) {\r\n    var row, item = [];\r\n    start({\r\n        \"headers\": {\r\n            \"Content-Type\": \"application/json\"\r\n        }\r\n    });\r\n    while (row = getRow()) {\r\n        item.push({\r\n            year: row.key[0],\r\n            month: row.key[1],\r\n            date: row.key[2],\r\n            hour: row.key[5],\r\n            serviceName: row.key[3],\r\n            serviceOperation: row.key[4],\r\n            status: row.key[6],\r\n            globalId: row.key[7],\r\n            stats: row.value\r\n        });\r\n    }\r\n    var json = JSON.stringify(item);\r\n    send(json);\r\n}",
      "uiByMonth": "function (head, req) {\r\n    var row, item = [];\r\n    start({\r\n        \"headers\": {\r\n            \"Content-Type\": \"application/json\"\r\n        }\r\n    });\r\n    while (row = getRow()) {\r\n        item.push({\r\n            year: row.key[0],\r\n            month: row.key[1],\r\n            date: row.key[4],\r\n            serviceName: row.key[2],\r\n            serviceOperation: row.key[3],\r\n            status: row.key[5],\r\n            stats: row.value\r\n        });\r\n    }\r\n    var json = JSON.stringify(item);\r\n    send(json);\r\n}",
      "uiByYear": "function (head, req) {\r\n    var row, item = [];\r\n    start({\r\n        \"headers\": {\r\n            \"Content-Type\": \"application/json\"\r\n        }\r\n    });\r\n    while (row = getRow()) {\r\n        item.push({\r\n            year: row.key[0],\r\n            month: row.key[3],\r\n            serviceName: row.key[1],\r\n            serviceOperation: row.key[2],\r\n            status: row.key[4],\r\n            stats: row.value\r\n        });\r\n    }\r\n    var json = JSON.stringify(item);\r\n    send(json);\r\n}"
   }
}