export default class SimpleURL {
  private _protocol: string;
  private _hostname: string;
  private _port: string;
  private _pathname: string;
  private _search: string;
  private _hash: string;
  private _searchParams: URLSearchParams;

  constructor(url: string, base?: string) {
    let fullUrl = url;
    if (base && !url.match(/^[a-z][a-z0-9+.-]*:/i)) {
      const baseUrl = new SimpleURL(base);
      fullUrl = baseUrl.href + (url.startsWith('/') ? '' : baseUrl.pathname) + url;
    }

    const match = fullUrl.match(/^(https?):\/\/([^/:]+)(?::(\d+))?([^?#]*)(\?[^#]*)?(#.*)?/i);
    if (!match) throw new Error('Invalid URL');

    this._protocol = match[1] + ':';
    this._hostname = match[2];
    this._port = match[3] || '';
    this._pathname = match[4] || '/';
    this._search = match[5] || '';
    this._hash = match[6] || '';
    this._searchParams = new URLSearchParams(this._search.slice(1)); // Remove leading '?'
  }

  get protocol(): string {
    return this._protocol;
  }

  get hostname(): string {
    return this._hostname;
  }

  get port(): string {
    return this._port || (this._protocol === 'http:' ? '80' : this._protocol === 'https:' ? '443' : '');
  }

  get pathname(): string {
    return this._pathname;
  }

  get search(): string {
    const query = this._searchParams.toString();
    return query ? `?${query}` : '';
  }

  get hash(): string {
    return this._hash;
  }

  get href(): string {
    const portPart = this._port ? `:${this._port}` : '';
    const queryPart = this._searchParams.toString() ? `?${this._searchParams.toString()}` : '';
    return `${this._protocol}//${this._hostname}${portPart}${this._pathname}${queryPart}${this._hash}`;
  }

  get origin(): string {
    const portPart = this._port ? `:${this._port}` : '';
    return `${this._protocol}//${this._hostname}${portPart}`;
  }

  get searchParams(): URLSearchParams {
    return this._searchParams;
  }

  set protocol(value: string) {
    if (!value.endsWith(':')) value += ':';
    if (!/^[a-z][a-z0-9+.-]*:$/i.test(value)) throw new Error('Invalid protocol');
    this._protocol = value;
  }

  set hostname(value: string) {
    if (!/^[a-z0-9.-]+$/i.test(value)) throw new Error('Invalid hostname');
    this._hostname = value;
  }

  set port(value: string) {
    if (value && !/^\d+$/.test(value)) throw new Error('Invalid port');
    this._port = value;
  }

  set pathname(value: string) {
    if (!value.startsWith('/')) value = '/' + value;
    this._pathname = value;
  }

  set search(value: string) {
    this._search = value.startsWith('?') ? value : value ? `?${value}` : '';
    this._searchParams = new URLSearchParams(this._search.slice(1));
  }

  set hash(value: string) {
    this._hash = value.startsWith('#') ? value : value ? `#${value}` : '';
  }

  toString(): string {
    return this.href;
  }

  toJSON(): string {
    return this.href;
  }
}

Object.defineProperty(SimpleURL.prototype, 'toString', {
  value: SimpleURL.prototype.toString,
  writable: true,
  configurable: true,
});

