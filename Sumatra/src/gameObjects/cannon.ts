module FirstPhaser.Client {
    enum CannonStateEnum { Idle, GoingUp, FallingDown }

    export class Cannon extends Phaser.Sprite {
        private cannonState: CannonStateEnum;
        private posInitialX: number;
        private posInitialY: number;
        private isHitOnGround: boolean;
        private timeToGoUp: number = 1000;

        constructor(game: Phaser.Game, x:number, y:number) {
            super(game, x, y, 'imgCannon');
            this.anchor.setTo(0.5);

            game.add.existing(this);

            this.cannonState = CannonStateEnum.Idle;

            this.posInitialX = x;
            this.posInitialY = y;
            this.isHitOnGround = false;

        }

        update() {
            //this.posInitial = new Phaser.Point(0, 0);
            //this.footerText.setText("Boom : " + this.boom.x + "x" + this.boom.y);
        }

        private goUp() {
            var tweenUp = this.game.add.tween(this).to({ x: this.x, y: this.y - 400 }, this.timeToGoUp, Phaser.Easing.Quadratic.Out, true);
            tweenUp.onComplete.add(this.fallDown, this);

            var tweenResize = this.game.add.tween(this.scale).to({ x: 0.5, y: 0.5 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
        }
        private fallDown() {
            this.cannonState = CannonStateEnum.FallingDown;
            var tweenUp = this.game.add.tween(this).to({ x: this.x, y: this.y + 405 }, this.timeToGoUp, Phaser.Easing.Quadratic.In, true);
            tweenUp.onComplete.add(this.hitOnGround, this);

            var tweenResize = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
        }
        private hitOnGround() {
            this.game.add.audio('soundCannonFall', 1, false).play() 
            this.visible = false;
            this.isHitOnGround = true;
            var tweenUp = this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tweenUp.onComplete.add(this.shootOver, this);
        }
        private shootOver() {
            this.cannonState = CannonStateEnum.Idle;
            this.position = new Phaser.Point(this.posInitialX, this.posInitialY);
            
            this.scale.set(1);
            this.visible = true;
        }

        checkHitOnGround(): boolean {
            if (this.isHitOnGround) {
                this.isHitOnGround = false;
                return true;
            }
            else {
                return false;
            }
        }
        getCannonPosition(): Phaser.Point {
            return new Phaser.Point(this.x, this.y);
        }
        isIdle(): boolean {
            if (this.cannonState == CannonStateEnum.Idle)
                return true;
            else
                return false;
        }
        startFiring(): boolean {
            if (this.cannonState == CannonStateEnum.Idle) {
                this.cannonState = CannonStateEnum.GoingUp;
                this.goUp();
                //alert(this.posInitialX + "x" + this.posInitialY);
                this.game.add.audio('soundBazooka', 1, false).play()
                this.isHitOnGround = false;

                return true;
            }
            else {
                return false;
            }
        }
        setPosition(pos: Phaser.Point) {
            this.position = pos;
            this.posInitialX = pos.x;
            this.posInitialY = pos.y;
        }
    }
}