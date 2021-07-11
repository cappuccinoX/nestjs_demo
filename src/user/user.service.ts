import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: Array<UserEntity>;

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
    const list = [
      { name: "护手霜", counts: 20 },
      { name: "感冒灵", counts: 2 },
      { name: "膳存", counts: 200 },
      { name: "蛋白粉", counts: 10 },
      { name: "农牧颗粒", counts: 15 },
    ]
    if (!limit) {
      return { code: 20, msg: "参数limit不存在" };
    }
    if (limit >5 || limit < 0) {
      return { code: 21, msg: "参数limit需大于0小于5" };
    }
    return {code: 10, data: list.slice(0, limit), msg: "success"};
  }
}
