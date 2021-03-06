/// <reference path="_all.d.ts" />
"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        this.routes();
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        var index: indexRoute.Index = new indexRoute.Index();
        router.get("/", index.index.bind(index.index));
        this.app.use(router);
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        //configure jade
        //console.log(__dirname);
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");

        //mount logger
        //this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
}

let server = Server.bootstrap();
export { server };
