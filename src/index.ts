import { FastifyInstance } from "fastify";
import KafkaService from "./modules/services/kafkaService";
import { sendApmErrorString } from "./utils";
import { createServer } from './server'
import { JobBook } from "./modules/services/JobBook";

createServer()
    .then((server: any) => {

        // check status plugin
        server.redis.set('test', 'Connected', "EX", server.conf.expireToken, (err, val) => {
            if (err) {
                server.log.info('Failed to establish Redis Connection.');
                server.log.error(JSON.stringify(err));
            } else {
                server.log.info('Redis Connection has been established successfully.');
            }
        });

        const apmServerStatus = server.apm.isStarted();
        if (apmServerStatus) {
            server.log.info('Server connected to APM Server');
        } else {
            server.log.info('Server not connected to APM Server');
        }

        server.kafkaClient.on('ready', () => {
            server.log.info('Kafka Client Connection has been established successfully..');
        });
        server.kafkaClient.on('error', (err) => {
            sendApmErrorString(server,err);

            server.log.info('Server not connected to Kafka.');
        });
        const kafkaService = new KafkaService(server);
        kafkaService.subscribeTopic('bookInsert');

        const job = new JobBook(server.db);
        // server.scheduler.addSimpleIntervalJob(job.jobInsertBook);
        

    }).catch(error => {
        // do something
        console.log(error);
    });

