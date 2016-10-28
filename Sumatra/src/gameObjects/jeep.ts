module FirstPhaser.Client {
    enum MotionStateEnum { Idle = 0, Moving = 1}

    export class Jeep extends Phaser.Sprite {
        width: number;
        height: number;
        motionState: MotionStateEnum;
        xMovementOffset: number;
        xPrevious: number;
        private xTouchBeforeMotion: number;
        private durationEngineUp: number = 250;
        private durationEngineDown: number = 1250;
        private explosion: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'imgJeep');
            game.add.existing(this);
            this.anchor.set(0.5, 1);
            
            this.explosion = new Phaser.Sprite(game, 0, 0, "JeepExplosion", 1);
            this.explosion.animations.add('jeepExplosionAnimation', null, 5, false);
            this.explosion.anchor.setTo(0.5, 1);
            this.explosion.visible = false;
            this.explosion.scale.setTo(1.2);

            this.addChild(this.explosion);

            // Physics
            game.physics.enable(this);
            
            this.body.collideWorldBounds = false;
            this.body.setCircle(20);
            this.body.velocity.x = 0;
            this.scale.x = 1;
           
            this.motionState = MotionStateEnum.Idle;

            this.engineMovementUp();
        }

        update() {
           
        }

        private engineMovementUp() {
            var duration = this.durationEngineUp + this.durationEngineUp * 0.25 * (Math.random() - 0.5);
            var tween = this.game.add.tween(this.scale).to({ y: 1.015 }, duration, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(this.engineMovementDown, this);
        }
        private engineMovementDown() {
            var duration = this.durationEngineDown + this.durationEngineDown * 0.25 * (Math.random() - 0.5);
            var tween = this.game.add.tween(this.scale).to({ y: 1.00 }, duration, Phaser.Easing.Bounce.Out, true);
            tween.onComplete.add(this.engineMovementUp, this);
        }
        private bangAnim() {
            var tween = this.game.add.tween(this.scale).to({ y: 1.05 }, 200, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
        }

        isInArea(x, y) {
            var left = this.left;
            var right = this.right;

            if (this.scale.x < 0) {
                var left = this.right;
                var right = this.left;
            }

            if (x > left && x < right && y > this.top && y < this.bottom)
                return true;
            else
                return false;
        }
        startMotion(x) {
            if (this.motionState == MotionStateEnum.Idle) {
                this.xMovementOffset = x - this.x;
                this.xPrevious = this.x;
                this.xTouchBeforeMotion = x;
                this.motionState = MotionStateEnum.Moving;
            }
        }
        endMotion() {
            this.xMovementOffset = 0;
            this.motionState = MotionStateEnum.Idle;
        }
        tickleMe(x, y) {
            if (this.isInArea(x, y)) {
                var tween = this.game.add.tween(this.scale).to({ y: 1.05 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);

                return true;
            }
            else {
                return false;
            }
        }
        isMoving() { return this.motionState == MotionStateEnum.Moving; }
        isIdle() { return this.motionState == MotionStateEnum.Idle; }
        getCanonLocation() { return new Phaser.Point(this.x, this.y - 200); }
        showJeepExplosion() {
            //this.visible = false;
            //this.explosion.position.setTo(0, 0);
            this.explosion.visible = true;
            this.explosion.animations.play('jeepExplosionAnimation');
            var tween = this.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.hideJeepExplosion, this);
        }
        hideJeepExplosion() {
            this.explosion.visible = false;
            this.alpha = 1;
            this.explosion.alpha = 1;
            
            //this.animations.stop('jeepExplosionAnimation');
            //this.visible = true;
        }

    }
}