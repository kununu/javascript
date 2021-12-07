import { Request, Response } from "express";
// import {nextServer} from "@kununu/utils";
import nextServer from "../../dist/nextServer";

const {app, server} = nextServer({appPrefix: 'appProfiles', application: 'appProfiles'});
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
