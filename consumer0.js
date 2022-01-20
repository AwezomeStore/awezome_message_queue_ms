const  amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'tatiana',
    password: '123456',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN','EXTERNAL']
}

connect();

async function connect(){

    const queue = "Order-Cash";
    const request = "Order"



    try{

        const conn = await amqp.connect(rabbitSettings);
        console.log("Connection Created... ");

        const channel = await conn.createChannel();
        console.log("Channel Created... ");

        const res = await channel.assertQueue(queue);
        console.log("Queue Created... ");

        console.log(`Waiting for messages from ${request}`);
        channel.consume(queue, message => {
            let order = JSON.parse(message.content.toString());
            console.log(`Recived Order ${order.name}`);
            console.log(order);

            if(order.request == request){
                channel.ack(message);
                console.log("Delete message from queue... \n");
            }else{
                console.log("That message is not for me I'll no delete it...");
            }
        })

    }catch(err){
        console.error(`Error -> ${err}`);

    }

}