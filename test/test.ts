import { compose, applyMiddleware } from 'redux';

const add = a => b => a + b;
const multiply = a => b => a * b;
console.log(compose(multiply(3), add(2))(1));

console.log('---');

type Dispatch = (action: any) => any;
const fn1 = (next: Dispatch): Dispatch => {
  console.log('get dispatch: fn1');
  return (action: any) => (
    console.log('get action: fn1'), action === 'STOP' ? undefined : next(action)
  );
};
const fn2 = (next: Dispatch): Dispatch => {
  console.log('get dispatch: fn2');
  return (action: any) => (console.log('get action: fn2'), next(action));
};

const dispatch = action => (
  console.log('dispatch called with', action), action
);

console.log('start compose');
const composed = compose(fn1, fn2);
console.log('end compose');
console.log('-');
console.log('start composed(dispatch)');
const newDispatch = composed(dispatch);
console.log('end composed(dispatch)');
console.log('-');
console.log('start newDispatch(ACTION)');
console.log(newDispatch('STOP'));
console.log('end newDispatch(ACTION)');

type Reducer<A, B> = (b: B, a: A) => B;
type Endomorphism<B> = (b: B) => B;
type CreateEndomorphism<A, B> = (a: A) => Endomorphism<B>;
