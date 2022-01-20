const  amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'root',
    password: '123456',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect(){

    const queue = "Order-Cash";
    const newQueue = "Products";

    

    const msgs = [
        {"id_shopping_car":"XA12FFE", 
        "peticion":"type ShopingCar {id_User: 1, Value: 2, Total_products: 5, Products: [Product {id_product: A1F, Avalable: 1,Amound: 1, Coupons: null }",
        "request":"Order"},
        {"id_shopping_car":"EBFETETSDSFWE", 
        "peticion":"JSON Products to Request",
        "request":"Request"},
        {"id_shopping_car":"SXDRGRT2F45", 
        "peticion":"type ShopingCar {id_User: 2, Value: 4, Total_products: 1, Products: [Product {id_product: 2D43F1, Avalable: 1,Amound: 2, Coupons: null}",
        "request":"Order"},
    ]

    try{

        const conn = await amqp.connect(rabbitSettings);
        console.log("Connection Created... ");

        const channel = await conn.createChannel();
        console.log("Channel Created... ");

        let res = await channel.assertQueue(queue);
        console.log("Queue Created... ");

        for(let msg in msgs){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Shipping-Car send to ${queue}`);
        }

        res = await channel.assertQueue(newQueue);
        console.log("Queue Created... ");


        for(let msg in msgs){
            await channel.sendToQueue(newQueue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Check product availability ${newQueue}`);
        }

    }catch(err){
        console.error(`Error -> ${err}`);

    }

}