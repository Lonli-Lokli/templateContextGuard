const enum EitherType {
  Left = 'Left',
  Right = 'Right'
}
class EitherConstructor<L, R, T extends EitherType = EitherType> {
  static from<T>(v: T) {
    return this.right(v);
  }

  static right<L, T>(v: T): Either<L, T> {
    return new EitherConstructor<L, T, EitherType.Right>(EitherType.Right, v);
  }

  static left<T, R>(v: T): Either<T, R> {
    return new EitherConstructor<T, R, EitherType.Left>(EitherType.Left, v);
  }

  private constructor(
    private readonly type: T,
    public readonly value: T extends EitherType.Left ? L : R
  ) {}

  isLeft(): this is EitherConstructor<L, R, EitherType.Left> {
    return this.type === EitherType.Left;
  }

  isRight(): this is EitherConstructor<L, R, EitherType.Right> {
    return this.type === EitherType.Right;
  }

  mapRight<T>(f: (r: R) => T): Either<L, T> {
    return this.map(f);
  }

  mapLeft<T>(f: (l: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return EitherConstructor.left<T, R>(f(this.value as L));
    }
    return EitherConstructor.right<T, R>(this.value as R);
  }

  map<T>(f: (r: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, T>(this.value as L);
    }
    return EitherConstructor.right<L, T>(f(this.value as R));
  }
}

export type Either<L, R> =
  | EitherConstructor<L, R, EitherType.Right>
  | EitherConstructor<L, R, EitherType.Left>;

export const {
  left,
  right,
  from
} = EitherConstructor;

export const isEither = <L, R>(
  value: unknown | Either<L, R>
): value is Either<L, R> => value instanceof EitherConstructor;