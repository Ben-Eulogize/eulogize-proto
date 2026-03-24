const MAX_UNDO_CONTENT_SIZE = 10

export class UndoHelper {
  public static createUndoContentListWithNewItem<T>(
    undoContentList: Array<T> = [],
    newContent: T,
  ): Array<T> {
    return [newContent, ...undoContentList].splice(0, MAX_UNDO_CONTENT_SIZE)
  }

  public static recordUndoContentList<
    T extends { activeItem: any; undoContentList?: any },
    C,
  >(productState: T): T {
    const activeCardProduct = productState.activeItem
    return {
      ...productState,
      undoContentList: this.createUndoContentListWithNewItem<C>(
        productState.undoContentList,
        activeCardProduct?.content!,
      ),
      redoContentList: [],
    }
  }
}
