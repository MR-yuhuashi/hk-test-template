/**
 * this file contain all api for bu
 */
import Base from './base';

class BuService extends Base {
  constructor(props) {
    super(props);
  }

  getBuList() {
    this.url = '/mock/bu.json';
    return this.get({});
  }
}

const buService = new BuService();

export default buService;
