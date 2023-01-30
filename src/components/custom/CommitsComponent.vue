<template>
  <div>
    <div style="width: 35%">
      <q-input
        color="accent"
        dense
        v-on:keyup.enter="AddComment"
        v-model="add_comment"
        label="Agrega un comentario aquí..."
      >
        <template v-slot:before> </template>
        <template v-slot:append>
          <q-btn round dense color="accent" flat icon="insert_comment" />
        </template>
      </q-input>
    </div>
    <q-scroll-area
      style="height: 300px"
      class="col"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div class="q-pa-sm">
        <q-timeline side="right">
          <q-timeline-entry
            style="font-size: 12px"
            v-for="item in commits.slice().reverse()"
            :key="item"
            :body="'Nota de ' + item.nombre_usuario + ' - ' + item.fecha"
            avatar="user.png"
            color="grey-4"
          >
            <br /><span v-if="item.type == 'new'">
              <q-chip
                :color="$q.dark.isActive ? 'accent' : 'green-2'"
                style="font-size: 11px"
                icon="note_add"
              >
                {{ item.comment }}
              </q-chip>
            </span>
            <span v-if="item.type == 'comment'">
              <q-chip
                class="text-dark"
                :color="$q.dark.isActive ? 'cyan-14' : 'blue-2'"
                style="font-size: 11px"
                icon="comment"
              >
                {{ item.comment }}
              </q-chip>
            </span>
            <span
              v-show="item.type == 'put'"
              v-for="item2 in item.campos_mutated"
              :key="item2"
            >
              <q-chip style="font-size: 11px" icon="update">
                {{ item2.campo }}: {{ item2.before }} » {{ item2.after }} </q-chip
              ><br />
            </span>
            <q-separator />
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import Track from "src/utils/js/TrackVisibility";
export default {
  name: "commits-component",
  props: {
    commits: {
      type: Object,
      require: true,
    },
    track_visibility: {
      type: Array,
      require: true,
    },
    form_data_original: {
      type: Object,
      require: true,
    },
    form_data: {
      type: Object,
      require: true,
    },
    destination_url: {
      require: true,
    },
  },
  data() {
    return {
      add_comment: "",
      thumbStyle: {
        right: "4px",
        borderRadius: "7px",
        backgroundColor: "#727272",
        width: "4px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#727272",
        width: "8px",
        opacity: 0.2,
      },
    };
  },
  computed: {},
  methods: {
    async AddComment() {
      let r_object = Track.TrackVisibility(
        "comment",
        this.track_visibility,
        this.form_data_original,
        this.form_data,
        this.add_comment
      );
      // if (PutAction) {
      //     this.add_comment = ''
      //     this.TipoCuentaRequest()
      // }
    },
  },
};
</script>
