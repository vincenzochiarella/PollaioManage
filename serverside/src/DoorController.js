const axios = require('axios')


module.exports.open = open = () => {
    axios.post('http://localhost:5000/ckHouse/getdoorstatus').then(
        data => {
            if (data.data.doorStatus === 0) {
                axios.post('http://localhost:5000/ckHouse/setdoorstatus', {
                    doorStatus: 2
                }).then((res) => {
                    //quando modifico lo stato in running non deve essere possibile utilizzare di nuovo il bottone per 30 sec
                    require('./ScriptPy/index').runOpendoor()
                    setTimeout(() => {
                        axios.post('http://localhost:5000/ckHouse/setdoorstatus', {
                            doorStatus: 1
                        })
                    }, 30000)
                })
            }
        })
}

module.exports.close = close = () => {
    axios.post('http://localhost:5000/ckHouse/getdoorstatus').then(
        data => {
            if (data.data.doorStatus === 1) {
                axios.post('http://localhost:5000/ckHouse/setdoorstatus', {
                    doorStatus: 2
                }).then((res) => {
                    //quando modifico lo stato in running non deve essere possibile utilizzare di nuovo il bottone per 30 sec
                    require('./ScriptPy/index').runClosedoor()
                    setTimeout(() => {
                        axios.post('http://localhost:5000/ckHouse/setdoorstatus', {
                            doorStatus: 0
                        }).catch()
                    }, 30000)
                }).catch(err => {
                    console.log(" Errore generico sulla richiesta")
                })
            }
        })
}