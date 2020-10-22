export default class JsonTool {
  public static isJSONString(str: string) {
    if (typeof str === 'string') {
      try {
        const obj = JSON.parse(str);
        return typeof obj === 'object' && obj;
      } catch (e) {
        return false;
      }
    }
  }
}
