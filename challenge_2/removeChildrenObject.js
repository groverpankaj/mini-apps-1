const processInputData = (input) => {
  // console.log(input);

  let result = [];

  const removeChild = parent => {

    let childProp = parent.children;

    delete parent.children;

    result.push(parent);
    childProp.forEach(ele => {
      removeChild(ele);
    })

  }
  
  removeChild(JSON.parse(input));

  return result;
  
};

module.exports = processInputData;