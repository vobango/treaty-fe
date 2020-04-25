// https://www.jayfreestone.com/writing/react-portals-with-hooks/
import React from 'react';
import {createPortal} from 'react-dom';

function createRootElement(id) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  rootContainer.classList.add('relative', 'z-50');
  return rootContainer;
}

function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
}

function usePortal(id) {
  const rootElemRef = React.useRef();

  React.useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    parentElem.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current.remove();
      if (parentElem.childNodes.length === 0) {
        parentElem.remove();
      }
    };
  }, [id]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

const Portal = ({id, children}) => {
  if (!id) {
    throw new Error('No ID provided for portal root element!');
  }

  const target = usePortal(id);
  return createPortal(children, target);
};

export default Portal;
