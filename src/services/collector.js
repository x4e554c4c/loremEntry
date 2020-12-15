class Collector 
{
  find() {
    return document.querySelectorAll('input');
  }
}

export default new Collector();