import makeArr from './lib/makeArr';
import makeQueue from './lib/makeQueue';
import loader from './lib/loader';
import loadIntersections from './lib/loadIntersections';
import placeholder from './lib/placeholder';
import connection from './lib/connection';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const elements = makeArr(flags);

  const connectionType = connection();
  placeholder(elements, config.string);
  window.addEventListener('load', () => {
    // console.log('loaded initial');
    if (config.loadIntersections === true || !config.loadIntersections) loadIntersections(flags);
    window.requestIdleCallback(async () => {
      // console.log('arrived idle state');
      const queue = makeQueue(flags);
      console.log(queue);
      await loader(queue.withPriority, connectionType);
      // console.log('loaded high priority');
      await loader(queue.others, connectionType);
      // console.log('loaded everything');
    }, { timeout: 2000 });
  });
};

tattica();
