new class Injector 
{
  computeUrl() {
    return chrome.runtime.getURL(path + '.js');
  }
  
  link(path) {
    let script = document.createElement('script');

    // Auto deletion from DOM
    script.onload = () =>
      script.remove();

    script.setAttribute('src', src);

    document.body.append(script);
  }
}

export default new Injector();