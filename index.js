const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
class Joshua{
    constructor(db, collection){
        this.db = db;
        this.collection = collection;
        this.data = this.db.collection(this.collection).find({}).toArray().then((data)=>{
            return data;
        })
    }
    get id(){
        return this.data.then((data)=>{
            return data[0]._id;
        })
    }
    get name(){
       return this.data.then((data)=>{
           return data[0].name;
       })
    }
    get skills(){
        return this.data.then((data)=>{
            return data[0].skills;
        })
    }
    get portfolio(){
        return this.data.then((data)=>{
            return data[0].portfolio;
        })
    }
    get contact(){
        return this.data.then((data)=>{
            return data[0].contact;
        })
    }
    get about(){
        return this.data.then((data)=>{
            return data[0].about;
        })
    }
    get photo(){
        return this.data.then((data)=>{
            return data[0].photo;
        })
    }

    addSkills(newSkill){
        return this.skills.then((data)=>{
            let oldSkills = data;
            let newSkills = data.push(newSkill);
            return this.id.then((id)=>{
                this.db.collection(this.collection).update({_id: id}, 
                {$set:{skills: newSkills}})
            })
            
        })
    }
}
MongoClient.connect("mongodb://joshkeys:mypass@cluster0-shard-00-00-zjxq4.mongodb.net:27017,cluster0-shard-00-01-zjxq4.mongodb.net:27017,cluster0-shard-00-02-zjxq4.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", (err, client)=>{
    assert.equal(null, err);
    console.log("Connected to the database");
    let db = client.db("joshua-oguma");

    let joshua = new Joshua(db, "details");
    joshua.skills.then((data)=>{
        console.log(data)
    })
    joshua.addSkills("Front End Developer").then((finished)=>{
        joshua.skills.then((data)=>{
            console.log(data);
        });
    })
})
