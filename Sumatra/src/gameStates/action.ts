module FirstPhaser.Client {
    enum GameStateEnum { NA = 0, Running = 1, LostOneLife = 2, GameOver = 9 }

    export class Action extends Phaser.State {
        private background: Phaser.Sprite;
        private music: Phaser.Sound;
        private billboardLives: Billboard;
        private gameOver: GameOver;
        private gameState: GameStateEnum = GameStateEnum.NA;
        private billboardPoints: Billboard;
        private txtLargeMessage: Phaser.Text;
        private statusText1: Phaser.Text;
        private statusText2: Phaser.Text;
        private statusText3: Phaser.Text;
        private jeep: Jeep;
        private volcano: Volcano;        
        private cannon: Cannon;
        private boom: Phaser.Sprite;
        private bang: Phaser.Sprite;
        private explosion: Phaser.Sprite;
        private jeepExplosion: Phaser.Sprite;
        private clouds: Cloud[];
        private fireballs: Fireball[];
        private jeepsFoo: JeepFoo[];
        private maxJeepsFoo: number = 5;
        private rhino: Rhino;
        private numLives: number = 3;
        private points: number = 0;
        private pointsForShootingMovingJeep: number = 100;
        private pointsForShootingMotionlessJeep: number = 25;
        
        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);

            //this.background = this.add.sprite(0, 0, 'level01-sprites','background');

            this.gameState = GameStateEnum.Running;

            this.add.image(0, 0, 'imgSky');

            this.clouds = new Array(5);
            for (var i = 0; i < this.clouds.length; i++) 
                this.clouds[i] = new Cloud(this.game);
            
            this.volcano = new Volcano(this.game, this.game.width / 2, 418);

            this.add.image(0, 332, 'imgBushes');
            this.add.image(0, 412, 'imgGround3');

            this.jeepsFoo = new Array(this.maxJeepsFoo);
            for (var i = 0; i < this.jeepsFoo.length; i++) {
                this.jeepsFoo[i] = new JeepFoo(this.game);
                this.jeepsFoo[i].hideMe();
            }

            this.boom = this.add.sprite(0, 0, 'imgBoom');
            this.boom.anchor.setTo(0.5);
            this.boom.visible = false;

            this.explosion = this.add.sprite(0, 0, 'imgExplosion');
            this.explosion.anchor.setTo(0.5);
            this.explosion.visible = false;

            this.add.image(0, 462, 'imgGround2');
            this.add.image(0, 517, 'imgGround0');
            this.add.image(0, 480, 'imgGround1');
            
            this.rhino = new Rhino(this.game, new Phaser.Point(0, 0));
            this.jeep = new Jeep(this.game, 930, 630);
            this.cannon = new Cannon(this.game, this.jeep.getCanonLocation().x, this.jeep.getCanonLocation().y);

            this.jeepExplosion = this.add.sprite(0, 0, 'imgExplosion');
            this.jeepExplosion.anchor.setTo(0.5);
            this.jeepExplosion.visible = false;

            this.bang = this.add.sprite(0, 0, 'imgBang');
            this.bang.anchor.setTo(0.5);
            this.bang.visible = false;

            this.fireballs = new Array(Fireball.maxFireballs);
            for (var i = 0; i < this.fireballs.length; i++) {
                this.fireballs[i] = new Fireball(this.game, this.volcano.getFireballLocation().x, this.volcano.getFireballLocation().y);
                this.fireballs[i].hideMe();
            }

            this.statusText1 = this.game.add.text(5, this.world.height - 36, "...", { font: "10px Arial", fill: "#FFFFFF", align: "center" });
            this.statusText1.anchor.setTo(0, 0);

            this.txtLargeMessage = this.game.add.text(this.world.width / 2, this.world.height / 2, "", { font: "bold 48px Arial", fill: "#FFFFFF", align: "center" });
            this.txtLargeMessage.anchor.setTo(0.5);
            this.txtLargeMessage.visible = false;

            this.statusText2 = this.game.add.text(5, this.world.height - 26, "...", { font: "10px Arial", fill: "#FFFFFF", align: "center" });
            this.statusText2.anchor.setTo(0, 0);

            this.statusText3 = this.game.add.text(5, this.world.height - 16, "...", { font: "10px Arial", fill: "#FFFFFF", align: "center" });
            this.statusText3.anchor.setTo(0, 0);

            this.billboardLives = new Billboard(this.game, new Phaser.Point(80, 40), BillboardTypeEnum.Lives);
            this.billboardLives.anchor.setTo(0.5);
            this.billboardLives.changeValue(this.numLives, false);

            this.billboardPoints = new Billboard(this.game, new Phaser.Point(this.game.width - 100, 40), BillboardTypeEnum.Points);
            this.billboardPoints.anchor.setTo(0.5);
            this.billboardPoints.changeValue(this.points, false);

            this.gameOver = new GameOver(this.game);
            this.gameOver.anchor.setTo(0.5);

            this.game.input.onTap.add(this.onTap, this);
            this.game.input.addMoveCallback(this.onMove, this);
             
            setTimeout(() => this.createRandomJeepFoo(), 1000);
            setTimeout(() => this.rhino.giveLife(), 1000);
            setTimeout(() => this.createRandomFireball(), 5000);
        }

        update() {
            if (this.game.input.activePointer.isDown) {
                if (this.jeep.isInArea(this.game.input.x, this.game.input.y)) {
                    if (this.jeep.isIdle()) {
                        this.jeep.startMotion(this.game.input.x);
                        this.statusText1.setText(this.jeep.motionState.toString() + " xPosStart = " + this.jeep.xMovementOffset);
                    }
                }
            }

            if (this.game.input.activePointer.isUp) {
                if (this.jeep.isMoving()) {
                    this.jeep.endMotion();
                    this.statusText1.setText(this.jeep.motionState.toString());
                }
 
            }

            this.handleJeepMovement();

            this.checkJeepHit();
            this.checkJeepRhinoVicinity();
            this.checkRhinoShooting();
            this.checkFireballHit();

            this.statusText2.setText("Fireball Duration : " + Fireball.durationForNewFireball);
        }
        onTap(pointer, doubleTap) {
            if (doubleTap) {
                this.statusText1.setText("double");
            }
            else {
                if (this.gameState == GameStateEnum.Running && this.jeep.isInArea(this.game.input.x, this.game.input.y)) {
                    this.jeep.tickleMe(this.game.input.x, this.game.input.y);

                    if (this.cannon.startFiring())
                        this.createBang(this.jeep.getCanonLocation().x, this.jeep.getCanonLocation().y);
                }

                if (this.volcano.tickleMe(this.game.input.x, this.game.input.y))
                    this.playTickSound();
            }
        }
        onMove(pointer, x, y, isClick) {
            //this.footerText.setText(x + "x" + y + ", " + isClick);
            if (this.cannon.isIdle())
                this.cannon.setPosition(this.jeep.getCanonLocation());
        }

        private playTickSound() { this.add.audio('click', 1, false).play() }

        private decreaseOneLife(): boolean {
            if (this.numLives > 0) {
                this.numLives--;
                this.billboardLives.changeValue(this.numLives, false);

                if (this.numLives == 0) {
                    this.gameOver.showAndAnimate();
                    this.gameState = GameStateEnum.GameOver;
                    this.handleGameOver();
                    return false;
                }
                else {
                    this.handleLostOneLife();
                    return true;
                }
            }
        }

        private addPoints(p: number) {
            if (this.gameState == GameStateEnum.Running) {
                this.points += p;
                this.billboardPoints.changeValue(this.points, true);
            }
        }

        private cleanAllFooElements() {
            if (this.jeep.x > this.jeep.xPrevious)
                this.jeep.scale.x = -1;
            else if (this.jeep.x < this.jeep.xPrevious)
                this.jeep.scale.x = 1;
        }

        private handleJeepMovement() {
            if (this.gameState == GameStateEnum.Running && this.jeep.isMoving()) {
                this.jeep.x = this.game.input.x - this.jeep.xMovementOffset;
                this.cleanAllFooElements();

                this.jeep.xPrevious = this.jeep.x;

                this.statusText1.setText("Moving " + this.jeep.xPrevious);
            }
        }
        private handleGameOver() {
            this.cleanAllFooElements();

            var strHiScore = window.localStorage.getItem('hiScore');
            var hiScore = 0;
            if (strHiScore != null) {
                hiScore = parseInt(strHiScore);
            }

            if (this.points > hiScore) {
                window.localStorage.setItem('hiScore', this.points.toString());
                alert("HI SCORE");
            }
        }
        private handleLostOneLife() {
            for (var i = 0; i < this.fireballs.length; i++)
                this.fireballs[i].hideMe();

            for (var i = 0; i < this.jeepsFoo.length; i++)
                this.jeepsFoo[i].hideMe();

            this.gameState = GameStateEnum.LostOneLife;
            this.txtLargeMessage.setText("LOST ONE LIFE");
            this.txtLargeMessage.visible = true;

            var tweenText = this.game.add.tween(this.txtLargeMessage.scale).to({ x: 1.1, y: 1.1 }, 1500, Phaser.Easing.Bounce.In, true);
            tweenText.onComplete.add(function () { this.game.add.tween(this.txtLargeMessage.scale).to({ x: 1, y: 1 }, 3000, Phaser.Easing.Elastic.Out, true); this.gameState = GameStateEnum.Running; this.txtLargeMessage.visible = false; setTimeout(() => this.createRandomJeepFoo(), 2000); }, this);

            
        }

        private checkJeepHit() {
            if (this.cannon.checkHitOnGround()) {
                this.createBoom(this.cannon.getCannonPosition().x, this.cannon.getCannonPosition().y);

                for (var i = 0; i < this.jeepsFoo.length; i++) {
                    if (this.jeepsFoo[i].visible && this.jeepsFoo[i].overlap(this.cannon))
                     {
                        if (this.jeepsFoo[i].isMoving())
                            this.addPoints(this.pointsForShootingMovingJeep);
                        else
                            this.addPoints(this.pointsForShootingMotionlessJeep);

                        this.jeepsFoo[i].hideMe();
                        this.createExplosion(this.cannon.getCannonPosition().x, this.cannon.getCannonPosition().y);
                        
                        setTimeout(() => this.createRandomJeepFoo(), 2000);
                        if (this.rhino.isStoppingNow())
                            this.rhino.restart();
                        Fireball.decreaseDurationForNewFireball();
                    }
                }
            }
        }
        private checkJeepRhinoVicinity() {
            for (var i = 0; i < this.jeepsFoo.length; i++) {
                if (this.jeepsFoo[i].visible == true && this.jeepsFoo[i].isMoving() && this.rhino.visible == true) {
                    if (Math.abs(this.jeepsFoo[i].x - this.rhino.x) < this.jeepsFoo[i].vicinityToRhino) {
                        this.jeepsFoo[i].stopToPrepareShooting(this.rhino);
                    }
                }
            }
        }
        private checkRhinoShooting() {
            for (var i = 0; i < this.jeepsFoo.length; i++) {
                if (this.jeepsFoo[i].visible == true && this.jeepsFoo[i].isShooting() && this.rhino.visible == true) {
                    this.jeepsFoo[i].hideMe();
                    if (this.rhino.isStoppingNow())
                        this.rhino.restart();
                    this.decreaseOneLife();

                    for (var j = 0; j < this.fireballs.length; j++) {
                        this.fireballs[j].hideMe();
                    }
                    
                    break;
                }
            }
        }
        private checkFireballHit() {
            if (this.gameState != GameStateEnum.Running)
                return;

            for (var i = 0; i < this.fireballs.length; i++) {
                if (this.fireballs[i].checkHitOnGround()) {
                    if (this.fireballs[i].overlap(this.jeep)) {
                        this.jeep.showJeepExplosion();
                        this.decreaseOneLife();
                    }

                    this.fireballs[i].hideMe();
                }
            }
        }

        private createBoom(x, y) {
            this.boom.position.set(x, y);
            this.boom.visible = true;
            this.boom.alpha = 0;

            var tween = this.game.add.tween(this.boom.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.boom.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);

            var tweenAlpha = this.game.add.tween(this.boom).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            tweenAlpha.onComplete.add(function () { this.game.add.tween(this.boom).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
        }
        private createJeepExplosion(x, y) {
            this.jeepExplosion.position.set(x, y);
            this.jeepExplosion.visible = true;
            this.jeepExplosion.alpha = 0;

            var tween = this.game.add.tween(this.jeepExplosion.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.jeepExplosion.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);

            var tweenAlpha = this.game.add.tween(this.jeepExplosion).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            tweenAlpha.onComplete.add(function () { this.game.add.tween(this.jeepExplosion).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
        }
        private createBang(x, y) {
            this.bang.position.set(x, y);
            this.bang.visible = true;
            this.bang.alpha = 0;

            var tween = this.game.add.tween(this.bang.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.bang.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);

            var tweenAlpha = this.game.add.tween(this.bang).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            tweenAlpha.onComplete.add(function () { this.game.add.tween(this.bang).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
        }
        private createExplosion(x, y) {
            this.explosion.position.set(x, y);
            this.explosion.visible = true;
            this.explosion.alpha = 0;

            var tween = this.game.add.tween(this.explosion.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.explosion.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);

            var tweenAlpha = this.game.add.tween(this.explosion).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            tweenAlpha.onComplete.add(function () { this.game.add.tween(this.explosion).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
        }
        private createRandomJeepFoo() {
            if (this.gameState == GameStateEnum.Running) {
                var isThereAJeepAlready = false;
                for (var i = 0; i < this.jeepsFoo.length; i++) {
                    if (this.jeepsFoo[i].visible == true)
                        isThereAJeepAlready = true;
                }

                if (!isThereAJeepAlready) {
                    for (var i = 0; i < this.jeepsFoo.length; i++) {
                        if (this.jeepsFoo[i].visible == false) {
                            this.jeepsFoo[i].showMe(this.rhino);
                            break;
                        }
                    }
                }
                
            }
        }
 
        private createRandomFireball() {
           
            // WARNING --- REMOVE THIS false BELOW
            if (this.gameState == GameStateEnum.Running) {
                for (var i = 0; i < this.fireballs.length; i++) {
                    if (this.fireballs[i].visible == false) {
                        this.fireballs[i].erupt();
                        break;
                    }
                }

                

                //var time = new Date().getTime();
                //this.statusText3.setText(time.toString());
            }

            setTimeout(() => this.createRandomFireball(), Fireball.durationForNewFireball);
        }
    }
}