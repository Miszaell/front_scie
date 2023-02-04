function getLabel(keys, key) {
  let label = keys[key].charAt(0).toUpperCase() + keys[key].slice(1);
  if (label.includes('_')) {
    label = label.replace(/_/g, " ");
  }
  return label
};

const ObjectCreator = (instance, deleteKeys) => {
  let data = JSON.parse(instance)
  if (data.length > 0) {
    const columns = [];
    let object = data[0];
    delete object.uuid;
    delete object.r_object;
    delete object.create_uid;
    delete object.updated_at;

    if (deleteKeys) {
      deleteKeys.forEach((e) => {
        delete object[e];
      });
    }

    let keys = Object.keys(object);
    for (let x = 0; x < keys.length; x++) {
      let label = getLabel(keys, x);
      columns[x] = {
        name: `${keys[x]}`,
        label: `${label}`,
        align: "left",
        field: `${keys[x]}`,
        sortable: true,
      };
    }
    return { columns, keys };
  }
};

const ObjectCreatorForm = (config = null, data) => {
  let conf = config
  let object = JSON.parse(data)
  let result = []

  delete object[0].uuid;
  delete object[0].r_object;
  delete object[0].create_uid;
  delete object[0].update_uid;
  delete object[0].updated_at;
  let keys = Object.keys(object[0])
  for (let index = 0; index < keys.length; index++) {
    result[index] = {
      key: `${keys[index]}`,
    }
  }
  for (const [key, val] of Object.entries(result)) {
    conf.forEach((item) => {
      if (item.element == keys[key]) {
        let label = getLabel(keys, key)
        val.type = item.type
        val.required = item.required
        val.label = label
        if (item.type == "select") {
          let options = { options: [] }
          for (let [ky, vl] of Object.entries(item.options)) {
            options.options[ky] = {
              value: vl.value,
              label: vl.label
            }
          }
          Object.assign(val, options)
        }
      }
    })
  }

  return result
};

const ObjectMutator = (instance, property) => {
  let newInstance = JSON.parse(JSON.stringify(instance));
  newInstance.forEach(function (item) {
    if (item.hasOwnProperty(property)) {
      delete item[property]
    }
  });
  return newInstance;
}

export default {
  ObjectCreator,
  ObjectCreatorForm,
  ObjectMutator
};
