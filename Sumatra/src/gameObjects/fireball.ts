module FirstPhaser.Client {
    enum PhaseEnum { Idle, GoingUp, FallingDown }

    export class Fireball extends Phaser.Sprite {
        private phase: PhaseEnum;
        private posInitialX: number;
        private posInitialY: number;
        private isHitOnGround: boolean;
        private timeToGoUp: number = 1500;
        private deltaXX: number = 0;
        static maxFireballs: number = 10;
        static durationForNewFireball: number = 2500;
        static deltaDurationForNewFireball: number = 40;
        static minDurationForNewFireball: number = 750;

        constructor(game: Phaser.Game, x:number, y:number) {
            super(game, x, y, 'FireballSprite', 1);
            this.animations.add('fireballAnimation', null, 10, true);
            this.anchor.setTo(0.5, 0.75);
            game.add.existing(this);

            this.phase = PhaseEnum.Idle;

            this.posInitialX = x;
            this.posInitialY = y;
            this.isHitOnGround = false;

            this.hideMe();
        }

        update() {
        }

        private goUp() {
            this.deltaXX = 250 * (Math.random() - 0.5);
            this.scale.setTo(0.0, 0.0);
            var tweenUp = this.game.add.tween(this).to({ x: this.x + this.deltaXX, y: this.y - 220 }, this.timeToGoUp, Phaser.Easing.Quadratic.Out, true);
            tweenUp.onComplete.add(this.fallDown, this);

            var tweenResize = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
        }
        private fallDown() {
            this.phase = PhaseEnum.FallingDown;
            var tweenUp = this.game.add.tween(this).to({ x: this.x + this.deltaXX * 4, y: this.y + 490 }, this.timeToGoUp, Phaser.Easing.Quadratic.In, true);
            tweenUp.onComplete.add(this.hitOnGround, this);

            var tweenResize = this.game.add.tween(this.scale).to({ x: 1.0, y: 1.0 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
        }
        private hitOnGround() {
            this.game.add.audio('soundCannonFall', 1, false).play()
            this.isHitOnGround = true;
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
        hideMe() {
            this.phase = PhaseEnum.Idle;
            this.position.setTo(this.posInitialX, this.posInitialY);
            this.scale.setTo(0, 0);
            this.visible = false;
            this.animations.stop('fireballAnimation');
        }
        erupt() {
            this.animations.play('fireballAnimation');
            this.position.setTo(this.posInitialX, this.posInitialY);
            this.visible = true;
            this.phase = PhaseEnum.GoingUp;
            this.goUp();
        }

        static decreaseDurationForNewFireball() {
            if (this.durationForNewFireball - this.deltaDurationForNewFireball > this.minDurationForNewFireball)
                this.durationForNewFireball -= this.deltaDurationForNewFireball;
        }
    }
}