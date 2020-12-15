import Collector from '~/collector'
import Inputs from '~/inputs'
import Entry from '~/entry'

function proceed() {
  let targets = Collector.find();

  Inputs.set(targets);
  Inputs.assign(type => {
    return Entry.generate();
  });
}

window.proceed = proceed;