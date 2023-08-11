import Router from "koa-router";
import lodash from "lodash";

const { map, filter, indexOf, split, get, slice, orderBy, trimStart, pick } =
  lodash;

const DATABASE = {
  value: {
    todos: [
      { done: false, label: "eye" },
      { done: false, label: "touch" },
      { done: false, label: "ear" },
    ],
    color: {
      r: 0,
      g: 0,
      b: 0,
    },
    toggle: false,
  },
  user: {
    1: { id: 1, name: "Sam" },
    2: { id: 2, name: "Steve" },
    3: { id: 3, name: "Allan" },
    4: { id: 4, name: "Don" },
  },
  device: {
    1: { id: 1, name: "Quadra", performance: 3 },
    2: { id: 2, name: "Performa", performance: 1 },
    3: { id: 3, name: "Classic", performance: 1 },
    4: { id: 4, name: "Newton", performance: 2 },
    5: { id: 5, name: "Lisa", performance: 1 },
    6: { id: 6, name: "Portable", performance: 2 },
    7: { id: 7, name: "PowerBook", performance: 2 },
    8: { id: 8, name: "Centris", performance: 2 },
  },
};

const router = new Router();
router.get("/value", (context, next) => {
  context.response.body = JSON.stringify(DATABASE.value);
});
router.put("/value", (context, next) => {
  const value = context.request.body;
  DATABASE.value = value;
  context.response.body = JSON.stringify(value);
});
router.get("/:type", (context, next) => {
  const {
    response,
    params: { type },
    query,
  } = context;
  // Filters
  const ids = !query.id ? [] : split(query.id, ",");
  const performanceGTE = parseInt(query.performance_gte || "0");
  const performanceLTE =
    (query.performance_lte && parseInt(query.performance_lte)) || Infinity;
  // Formatters
  const only = !query.only ? [] : split(query.only, ",");
  // Limits
  const start = parseInt(query.start || "0");
  const limit = (query.limit && parseInt(query.limit)) || Infinity;
  // Orders
  const orders =
    get(query, "order") == null ? [] : split(get(query, "order"), ",");
  if (type in DATABASE) {
    response.body = JSON.stringify(
      map(
        slice(
          orderBy(
            filter(
              filter(
                map(DATABASE[type]),
                (item) => ids.length === 0 || indexOf(ids, `${item.id}`) !== -1,
              ),
              (item) =>
                item.performance == null ||
                (performanceGTE <= item.performance &&
                  item.performance <= performanceLTE),
            ),
            map(orders, (key) => trimStart(key, "-")),
            map(orders, (key) => (key[0] === "-" ? "desc" : "asc")),
          ),
          start,
          start + limit,
        ),
        (item) => (only.length === 0 ? item : pick(item, only)),
      ),
    );
    return next();
  }
  response.body = JSON.stringify({ error: "Not found" });
  response.status = 404;
  return next();
});
router.get("/:type/:id", (context, next) => {
  const {
    response,
    params: { type, id },
  } = context;
  if (id in (DATABASE[type] || {})) {
    response.body = JSON.stringify(DATABASE[type][id]);
    return next();
  }
  response.body = JSON.stringify({ error: "Not found" });
  response.status = 404;
  return next();
});

const routes = router.routes();

export default (context, next) => {
  context.response.type = "json";
  return routes(context, next);
};
