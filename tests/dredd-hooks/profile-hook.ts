"use strict";

import hooks = require("hooks");
import redis = require("redis");
import config = require("../../src/config");
// tslint:disable-next-line:no-unused-locals
hooks.before("Subject > Subject Profiles > Retrieve subject profile", (transaction: any, done: any) => {
    const client = redis.createClient(6379, config.cache.redis);
    client.select(1);
    let val: any = {
        replica_assignment: {
          1: [1, 2, 3],
          2: [4, 5, 6],
        },
      };
    client.set("special-user:devicedata", JSON.stringify(val));
    val = {
        num_partitions: 2,
        replication_factor : 1,
    };
    client.set("*:devicedata", JSON.stringify(val), () => {
        done();
    });

  });
