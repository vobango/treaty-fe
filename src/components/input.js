import * as React from 'react';
import faker from 'faker';
import {motion, AnimatePresence} from 'framer-motion';

export const Input = ({
  error,
  clearError,
  id,
  label,
  type = 'input',
  textareaProps = {}
}) => {
  if (!label) {
    throw new Error('Input label must be specified!');
  }
  const inputID = id || faker.random.uuid();

  return (
    <>
      <label htmlFor={inputID} className="ml-1 font-bold">
        {label}
      </label>
      {type === 'input' ? (
        <input
          id={inputID}
          className={`my-1 p-1 w-1/2 border-b-2 ${
            error ? 'bg-red-100 border-red-400' : 'bg-gray-100 border-gray-400'
          }`}
          onFocus={clearError}
        />
      ) : (
        <textarea
          id={inputID}
          className="my-1 p-1 w-full bg-gray-100 border-b-2 border-gray-400"
          onFocus={clearError}
          {...textareaProps}
        />
      )}
      <AnimatePresence>
        {!!error && (
          <motion.div
            className="overflow-hidden text-red-700 text-sm transition-height"
            initial={{height: 0}}
            animate={{height: 'auto'}}
            exit={{height: 0}}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Input;
