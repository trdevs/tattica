import loadSingle from './loadSingle.mjs';
import loadBlock from './loadBlock.mjs';
import waitIdle from './waitIdle.mjs';
import error from './error.mjs';

const loader = async (elements, connection, resolve, index = 0) => {
  const newIndex = index + 1;
  const element = elements[index];
  if (!element) {
    resolve();
    return;
  }
  const {
    dataBlock,
    dataPriorityBlock,
  } = element.order;
  const hasBlock = dataBlock || dataPriorityBlock;
  if (hasBlock) {
    const block = elements.filter(e => e.order.dataBlock || e.order.dataPriorityBlock);
    await loadBlock(block, connection);
  } else {
    await loadSingle(element, connection).catch(error);
  }
  await waitIdle();
  loader(elements, connection, resolve, newIndex);
};

const loaderWithPromise = (elements, connection) => new Promise(resolve => loader(elements, connection, resolve));

export default loaderWithPromise;