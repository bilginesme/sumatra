module FirstPhaser.Client {

    export class Preloader extends Phaser.State {
        loaderText: Phaser.Text;
        footerText: Phaser.Text;

        preload() {
            
            this.loaderText = this.game.add.text(this.world.centerX, 200, "Loading...", { font: "18px Arial", fill: "#A9A91111", align: "center" });
            this.loaderText.anchor.setTo(0.5);

            this.footerText = this.game.add.text(this.world.centerX, this.world.height - 50, "Bilgin Eşme", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            this.footerText.anchor.setTo(0.5);

            this.load.image('titlepage', './assets/images/Welcome.png');
            this.load.image('logo', './assets/ui/gameLogo.png');
            this.load.audio('click', './assets/sounds/click.ogg', true);
            this.load.audio('soundBazooka', './assets/sounds/bazooka.wav', true);
            this.load.audio('soundCannonFall', './assets/sounds/cannon_fall.wav', true);

            this.load.atlasJSONHash('level01-sprites', './assets/sprites/level01-sprites.png', './assets/sprites/level01-sprites.json');
            this.load.atlasJSONHash('FireballSprite', './assets/sprites/FireballSprite.png', './assets/sprites/FireballSprite.json');
            this.load.atlasJSONHash('JeepExplosion', './assets/sprites/JeepExplosion.png', './assets/sprites/JeepExplosion.json');
            this.load.atlasJSONHash('RhinoSpriteSheet', './assets/sprites/RhinoSpriteSheet.png', './assets/sprites/RhinoSpriteSheet.json');

            this.load.image('imgSky', './assets/images/Sky.png');
            this.load.image('imgGround0', './assets/images/Ground0.png');
            this.load.image('imgGround1', './assets/images/Ground1.png');
            this.load.image('imgGround2', './assets/images/Ground2.png');
            this.load.image('imgGround3', './assets/images/Ground3.png');
            this.load.image('imgBushes', './assets/images/Bushes.png');

            this.load.image('imgJeep', './assets/images/Jeep.png');
            this.load.image('imgJeepFoo', './assets/images/JeepFoo.png');
            this.load.image('imgCannon', './assets/images/Cannon.png');
            this.load.image('imgFireball', './assets/images/Fireball.png');
            this.load.image('imgBoom', './assets/images/Boom.png');
            this.load.image('imgBang', './assets/images/Bang.png');
            this.load.image('imgExplosion', './assets/images/ExplosionWithBoom.png');
            this.load.image('imgRhino', './assets/images/Rhino.png');

            this.load.image('imgCloudSmall', './assets/images/CloudSmall.png');
            this.load.image('imgCloudLarge', './assets/images/CloudLarge.png');

            this.load.image('imgVolcanoCrest', './assets/images/VolcanoCrest.png');
            this.load.image('imgVolcanoSmoke', './assets/images/VolcanoSmoke.png');

            this.load.image('imgBGLives', './assets/images/BGLives.png');
            this.load.image('imgBGPoints', './assets/images/BGPoints.png');
            this.load.image('imgGameOver', './assets/images/GameOver.png');
        }

        create() {
            var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            //this.game.state.start('MainMenu', true, false);
            this.game.state.start('Action', true, false);
        }

    }

}