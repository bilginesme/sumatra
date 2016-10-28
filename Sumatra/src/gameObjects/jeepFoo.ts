module FirstPhaser.Client {
    enum PhaseEnum { Hidden, Moving, Stopping, Shooting, ShotComplete }

    export class JeepFoo extends Phaser.Sprite {
        private phase: PhaseEnum;
        private minVelocity: number = 50;
        vicinityToRhino: number;

        constructor(game: Phaser.Game) {
            super(game, 0, 0, 'imgJeepFoo');
            game.add.existing(this);
            this.anchor.set(0.5, 1);

            this.phase = PhaseEnum.Hidden;

            // Physics
            game.physics.enable(this);
            
            this.body.collideWorldBounds = false;
            this.body.setCircle(20);
            this.body.velocity.x = 0;
            this.scale.x = 1;
        }

        update() {
            if (this.phase == PhaseEnum.Moving && Math.abs(this.body.velocity.x) < this.minVelocity) {
                this.body.acceleration.x = 0;
                this.body.velocity.x = this.minVelocity * this.scale.x;
            }
        }

        showMe(rhino: Rhino) {
            var velocity = 90 + Math.random() * 45;
            var acceleration = 10;

            if (rhino.x < this.game.width / 2) {
                this.x = this.game.width;
                this.body.velocity.x = -velocity;
                this.body.acceleration.x = acceleration;
                this.scale.x = -1;
                
            }
            else {
                this.x = 0;
                this.body.velocity.x = velocity;
                this.body.acceleration.x = -acceleration;
                this.scale.x = 1;
            }

            if (rhino.scale.x * this.scale.x > 0)
                rhino.turnAroundAndMove();
            this.y = 450;
            this.visible = true;
           
            this.phase = PhaseEnum.Moving;
            this.vicinityToRhino = 200 + 100 * Math.random();
        }

        hideMe() {
            this.x = this.game.width;
            this.visible = false;
            this.body.velocity.x = 0;
            this.body.acceleration.x = 0;
            this.phase = PhaseEnum.Hidden;
        }

        stopToPrepareShooting(rhino: Rhino) {
            this.body.velocity.x = 0;
            this.body.acceleration.x = 0;
            this.phase = PhaseEnum.Stopping;
            setTimeout(() => this.shoot(), 5000);
            rhino.stop();
        }

        private shoot() {
            if (this.phase == PhaseEnum.Stopping)
                this.phase = PhaseEnum.Shooting;
        }

        isMoving() { return this.phase == PhaseEnum.Moving; }
        isShooting() { return this.phase == PhaseEnum.Shooting; }
    }

}