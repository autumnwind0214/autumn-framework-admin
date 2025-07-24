export type ResultTable<T> = {
  /** 当前页 */
  current?: number;
  /** 是否存在下一页 */
  pages?: number;
  /** 列表数据 */
  records: Array<T>;
  /** 每页显示条数 */
  size?: number;
  /** 总条目数 */
  total?: number;
};
