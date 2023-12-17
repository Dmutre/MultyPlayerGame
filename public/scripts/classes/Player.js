class Player {
  constructor(name) {
    this.id;
    this.name = name;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
  }

  draw(window) {
    this.element = document.createElement('div');
    this.element.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    this.element.style.zIndex = 10;
    this.element.style.width = '50px';
    this.element.style.height = '50px';
    this.element.style.borderRadius = '50%';
    this.element.style.position = 'absolute';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    return this.element;
  }
}