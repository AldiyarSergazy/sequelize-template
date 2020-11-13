const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const sequelize = new Sequelize("sqlite:./main.db", {
  logging: false,
  dialect: "sqlite",
  define: {
    timestamps: false,
  },
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    salary: DataTypes.INTEGER,
  },
  { sequelize, modelName: "user" }
);

const app = express();
const port = 3000;

(async () => {
  await sequelize.sync({ alter: true });
  /* const alex = await User.create({
    username: "Alex",
    salary: 250_000,
  }); // create */
  
  app.get('/users',async (req,res) => {
    const all = await User.findAll();
    res.send(JSON.stringify(all))
  });

  app.get('/user/:id',async (req,res) => {
    const user = await User.findOne({ where: { id: req.params.id }});
    if (user !== null) {
      res.send(JSON.stringify(user.dataValues))
    } else {
      res.status(404).send('Sorry cant find that!');
    }
  });

})();

app.listen(port, () => {
  console.log(`Сервер был запущен: http://localhost:${port}\n`);
})