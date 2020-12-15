class Injector 
{
  computeUrl(file) {
    return chrome.runtime.getURL(file);
  }
  
  link(src) {
    let script = document.createElement('script');

    // Auto deletion from DOM
    script.onload = () =>
      script.remove();

    script.setAttribute('src', src);
    
    document.body.append(script);
  }
}

export default new Injector();