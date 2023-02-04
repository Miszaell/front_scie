import moment from 'moment'
moment.locale('es')
export default {
  TrackVisibility(action, track_visibility, before, after, comment) {
    let commits = [];
    let r_object_now = before.r_object;
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    if (action == "put") {
      for (let [key, val] of Object.entries(before)) {
        function filterField(e) {
          return e == key;
        }
        let campo = track_visibility.filter(filterField);
        if (campo[0] == key) {
          if (val != after[key]) {
            commits.push({
              campo: key,
              before: val,
              after: after[key],
            });
          }
        }
      }
      let commit = {
        fecha: moment(new Date()).format('dddd, DD MMMM YYYY hh:mm'),
        date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        nombre_usuario: JSON.parse(localStorage.getItem("user")).name,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        user_icon: sessionStorage.getItem("userAvatar"),
        type: "put",
        comment: "Se actualizaron",
        campos_mutated: commits,
      };
      r_object_now.commits.push(commit);
      return r_object_now;
    } else if (action == "post") {
      const commit = {
        commits: [
          {
            fecha: moment(new Date()).format('dddd, DD MMMM YYYY hh:mm'),
            date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            nombre_usuario: JSON.parse(localStorage.getItem("user")).name,
            user_id: JSON.parse(localStorage.getItem("user")).id,
            user_icon: sessionStorage.getItem("userAvatar"),
            type: "new",
            comment: "Nuevo elemento creado",
            campos_mutated: [],
          },
        ],
      };

      return commit;
    } else if (action == "comment") {
      let commit = {
        fecha: moment(new Date()).format('dddd, DD MMMM YYYY hh:mm'),
        date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        nombre_usuario: JSON.parse(localStorage.getItem("user")).name,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        user_icon: sessionStorage.getItem("userAvatar"),
        type: "comment",
        comment: comment,
        campos_mutated: [],
      };
      r_object_now.commits.push(commit);
      return r_object_now;
    }
  },
};
