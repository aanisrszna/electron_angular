import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class PouchDbService {
  private db: any;

  constructor() {
    this.db = new PouchDB('users');
    this.initializeUser();
  }

  async initializeUser() {
    const user = {
      email: 'anis@aemenersol.com',
      password: 'Test@123'
    };

    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      await this.db.put({
        _id: user.email,
        email: user.email,
        password: hashedPassword
      });
      console.log('User initialized in PouchDB');
    } catch (error) {
      console.error('Error initializing user in PouchDB', error);
    }
  }

  async addUser(user: { email: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const response = await this.db.put({
        _id: user.email,
        email: user.email,
        password: hashedPassword
      });
      return response;
    } catch (error) {
      console.error('Error adding user to PouchDB', error);
    }
  }

  async getUser(email: string) {
    try {
      const doc = await this.db.get(email);
      return doc;
    } catch (error) {
      console.error('Error getting user from PouchDB', error);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.getUser(email);
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error validating user', error);
      return null;
    }
  }
}
