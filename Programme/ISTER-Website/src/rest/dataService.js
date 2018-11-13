export default class DataService{
    constructor(){
        this.path = 'http://localhost:8080/testserver/rs/sql/'
        
    }
    //static lest: String = "asef"

    static postPeriod(){
        console.log('entered leBla')
        console.log('path ' + this.path)
        console.log('path ' + lest)
        console.log('path ' + this.lest)
    }
    static postPeriods(){
        console.log('path ' + this.path)
        fetch(this.path + 'postPeriods',
                    {
                        method: "POST",
                        body: jsonObj,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(() => {
                        this.shadowRoot.getElementById('notification').innerHTML = 'Succesfully sent'
                    })
                    .catch((err) => {
                        this.shadowRoot.getElementById('notification').innerHTML = 'Failed sending data'
                        console.log(err.target.value)
                    })
    }
}