import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: Array<UserEntity>;
  list = [
    { id: 1, name: "护手霜", counts: 20 },
    { id: 2, name: "感冒灵", counts: 2 },
    { id: 3, name: "膳存", counts: 200 },
    { id: 4, name: "蛋白粉", counts: 10 },
    { id: 5, name: "农牧颗粒", counts: 15 },
  ]


  constructor() {
    this.users = [
      { id: 1, username: 'admin', password: 'admin' },
      { id: 2, username: 'tester', password: 'tester' },
    ];
  }

  /**
   * find user by username
   * @param username
   */
  async find(username: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.username === username);
    if (user) return user;
    else return null;
  }

  /**
   * list all users
   */
  async listAll(): Promise<Array<UserEntity>> {
    return this.users.map((user) => {
      const { password, ...info } = user;
      return info;
    });
  }

  medicine_list(limit) {
    if (!limit) {
      return { code: 20, msg: "参数limit不存在" };
    }
    if (limit >5 || limit < 0) {
      return { code: 21, msg: "参数limit需大于0小于5" };
    }
    return {code: 10, data: this.list.slice(0, limit), msg: "success"};
  }

  add_medicine(name, count) {
    if (!name || !count) {
      return { code: 20, msg: "参数错误" };
    }
    return { code: 10, msg: "success" };
  }

  find_medicine(id) {
    if (!id) {
      return { code: 20, msg: "参数id不存在" }
    }
    const medicine = this.list.find((v) => v.id === id)
    return { code: 10, msg: "success", data: medicine };
  }
}
