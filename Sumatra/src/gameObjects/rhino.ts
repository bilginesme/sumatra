module FirstPhaser.Client {
    enum MovingToLeftOrRightEnum { NA, Left, Stopping, Right }
    

    export class Rhino extends Phaser.Sprite {
        private statusText: Phaser.Text;
        movingToLeftOrRight: MovingToLeftOrRightEnum;
        durationForStopping: number;
        normDurationForStopping: number = 2000;
        normVelocity: number = 50;

        constructor(game: Phaser.Game, posInit: Phaser.Point) {
            super(game, posInit.x, posInit.y, 'RhinoSpriteSheet', 1);
            this.animations.add('rhinoWalking', [5, 6, 7], 4, true);
            this.animations.add('rhinoStopping', [1, 2, 3, 4], 4, true);
            game.add.existing(this);
            this.anchor.set(0.5, 1);

            this.visible = false;   // when created it's not visible
            
            // Physics
            game.physics.enable(this);
            
            this.body.collideWorldBounds = false;
            this.body.setCircle(20);
            this.body.velocity.x = 0;
          

            this.statusText = this.game.add.text(5, this.game.world.height / 2, "Rhino", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            this.statusText.anchor.setTo(0, 0.5);

            this.initRhino();
        }

        update() {
            this.statusText.setText("Rhino : " + this.movingToLeftOrRight.toString() + " LOC=" + Math.round(this.x) + "x" + Math.round(this.y));

            if (this.x < 0 || this.x > this.game.width)
                this.restart();
        }

        private initRhino(): void {
            this.scale.x = 1;
            this.y = 470;
            this.x = 0;
            this.stop();
        }
         
        isStoppingNow(): boolean { return this.movingToLeftOrRight == MovingToLeftOrRightEnum.Stopping; }

        giveLife(): void {
            if (!this.visible) {
                this.visible = true;
                this.scale.x = 1;
                this.movingToLeftOrRight = MovingToLeftOrRightEnum.Right;
                this.body.velocity.x = this.normVelocity;
                this.animations.play('rhinoWalking');
            }
        }

        stop(): void {
            this.movingToLeftOrRight = MovingToLeftOrRightEnum.Stopping;
            this.body.velocity.x = 0;
            this.animations.stop('rhinoWalking');
            this.animations.play('rhinoStopping');
        }

        restart(): void {
            if (this.scale.x > 0) {
                if (this.x > 0.75 * this.game.width) {
                    this.scale.x = -1;
                    this.movingToLeftOrRight == MovingToLeftOrRightEnum.Left;
                }
            }
            else {
                if (this.x < 0.25 * this.game.width) {
                    this.movingToLeftOrRight == MovingToLeftOrRightEnum.Right;
                    this.scale.x = 1;
                }
            }

            this.body.velocity.x = this.scale.x * this.normVelocity;
            this.animations.stop('rhinoStopping');
            this.animations.play('rhinoWalking');
        }

        turnAroundAndMove(): void {
            if (this.scale.x > 0) {
                this.scale.x = -1;
                this.movingToLeftOrRight = MovingToLeftOrRightEnum.Left;
            }
            else {
                this.scale.x = 1;
                this.movingToLeftOrRight = MovingToLeftOrRightEnum.Right;
            }

            this.body.velocity.x = this.scale.x * this.normVelocity;
        }

    }
}