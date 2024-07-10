import { app } from "./main/config/app";
import { sequelize } from './infra/database/repositories/config/database';

app.get("/", (req, res) => res.send("Express on Vercel"));

sequelize.sync().then(() => {
  app.listen(3000, () => { console.log(`Server running at http://localhost: 3000`) })
}).catch((error) => console.log(error));

module.exports = app;
