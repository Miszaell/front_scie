
import { exportFile } from "quasar";
export default {
  wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;
    formatted =
      formatted === void 0 || formatted === null ? "" : String(formatted);
    formatted = formatted.split('"').join('""');
    return `"${formatted}"`;
  },
  exportTable(col,data,name) {
    const content = [col.map((col) => this.wrapCsvValue(col.label))]
      .concat(
        data.map((row) =>
          col
            .map((col) =>
              this.wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile(name, content, "text/csv");

    if (status !== true) {
      $q.notify({
        message: "Descarga de archivo denegada por navegador...",
        color: "negative",
        icon: "warning",
      });
    }
  },
};
