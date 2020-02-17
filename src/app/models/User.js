import Sequelize, { Model } from 'sequelize';
import bcrypt, { compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    },
    {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => { // gerando o hash da senha do user
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(model) { // criando  o relacionamento com a tabela files
    this.belongsTo(model.File, { foreignKey: 'avatar_id', as: 'avatar' }); // recebendo this.connection.models de database/index.js
  }

  checkPassword(password) { // checando password de user
    return bcrypt.compare(password, this.password_hash);

  }
}

export default User;
