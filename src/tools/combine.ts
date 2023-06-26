
type Handler<I = Request, R = Response> = (input: I, next: Handler<I, R>) => R;

export function combine<I, R>(...handlers: Handler<I,R>[]): Handler<I,R> {
  return function (input, next) {
	 function dispatch(input, index) {
		const handler = handlers[index];
		if (handler == null) {
		  return next(input);
		}
		return handler(input, function (input) {
		  return dispatch(input, index + 1);
		});
	 }
	 return dispatch(input, 0);
  };
}
