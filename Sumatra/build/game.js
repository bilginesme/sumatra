var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                _super.call(this, 1136, 640, Phaser.AUTO, 'content', null);
                this.state.add('Boot', Client.Boot, false);
                this.state.add('Preloader', Client.Preloader, false);
                this.state.add('MainMenu', Client.MainMenu, false);
                this.state.add('Level01', Client.Level01, false);
                this.state.add('Action', Client.Action, false);
                this.state.start('Boot');
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
window.onload = function () {
    new FirstPhaser.Client.GameEngine();
};
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver(game) {
                _super.call(this, game, game.width / 2, game.height / 2, 'imgGameOver');
                game.add.existing(this);
                this.anchor.set(0.5);
                this.visible = false;
            }
            GameOver.prototype.update = function () {
            };
            GameOver.prototype.showAndAnimate = function () {
                this.scale.setTo(0.5, 0.5);
                this.visible = true;
                var durationEnlarge = 500;
                var durationShrink = 1000;
                var tween = this.game.add.tween(this.scale).to({ x: 1.2, y: 1.2 }, durationEnlarge, Phaser.Easing.Cubic.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);
            };
            return GameOver;
        }(Phaser.Sprite));
        Client.GameOver = GameOver;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var PhaseEnum;
        (function (PhaseEnum) {
            PhaseEnum[PhaseEnum["Idle"] = 0] = "Idle";
            PhaseEnum[PhaseEnum["GoingUp"] = 1] = "GoingUp";
            PhaseEnum[PhaseEnum["FallingDown"] = 2] = "FallingDown";
        })(PhaseEnum || (PhaseEnum = {}));
        var Fireball = (function (_super) {
            __extends(Fireball, _super);
            function Fireball(game, x, y) {
                _super.call(this, game, x, y, 'FireballSprite', 1);
                this.timeToGoUp = 1500;
                this.deltaXX = 0;
                this.animations.add('fireballAnimation', null, 10, true);
                this.anchor.setTo(0.5, 0.75);
                game.add.existing(this);
                this.phase = PhaseEnum.Idle;
                this.posInitialX = x;
                this.posInitialY = y;
                this.isHitOnGround = false;
                this.hideMe();
            }
            Fireball.prototype.update = function () {
            };
            Fireball.prototype.goUp = function () {
                this.deltaXX = 250 * (Math.random() - 0.5);
                this.scale.setTo(0.0, 0.0);
                var tweenUp = this.game.add.tween(this).to({ x: this.x + this.deltaXX, y: this.y - 220 }, this.timeToGoUp, Phaser.Easing.Quadratic.Out, true);
                tweenUp.onComplete.add(this.fallDown, this);
                var tweenResize = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
            };
            Fireball.prototype.fallDown = function () {
                this.phase = PhaseEnum.FallingDown;
                var tweenUp = this.game.add.tween(this).to({ x: this.x + this.deltaXX * 4, y: this.y + 490 }, this.timeToGoUp, Phaser.Easing.Quadratic.In, true);
                tweenUp.onComplete.add(this.hitOnGround, this);
                var tweenResize = this.game.add.tween(this.scale).to({ x: 1.0, y: 1.0 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
            };
            Fireball.prototype.hitOnGround = function () {
                this.game.add.audio('soundCannonFall', 1, false).play();
                this.isHitOnGround = true;
            };
            Fireball.prototype.checkHitOnGround = function () {
                if (this.isHitOnGround) {
                    this.isHitOnGround = false;
                    return true;
                }
                else {
                    return false;
                }
            };
            Fireball.prototype.hideMe = function () {
                this.phase = PhaseEnum.Idle;
                this.position.setTo(this.posInitialX, this.posInitialY);
                this.scale.setTo(0, 0);
                this.visible = false;
                this.animations.stop('fireballAnimation');
            };
            Fireball.prototype.erupt = function () {
                this.animations.play('fireballAnimation');
                this.position.setTo(this.posInitialX, this.posInitialY);
                this.visible = true;
                this.phase = PhaseEnum.GoingUp;
                this.goUp();
            };
            Fireball.decreaseDurationForNewFireball = function () {
                if (this.durationForNewFireball - this.deltaDurationForNewFireball > this.minDurationForNewFireball)
                    this.durationForNewFireball -= this.deltaDurationForNewFireball;
            };
            Fireball.maxFireballs = 10;
            Fireball.durationForNewFireball = 2500;
            Fireball.deltaDurationForNewFireball = 40;
            Fireball.minDurationForNewFireball = 750;
            return Fireball;
        }(Phaser.Sprite));
        Client.Fireball = Fireball;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var LeftOrRightEnum;
        (function (LeftOrRightEnum) {
            LeftOrRightEnum[LeftOrRightEnum["Left"] = 0] = "Left";
            LeftOrRightEnum[LeftOrRightEnum["Right"] = 1] = "Right";
        })(LeftOrRightEnum || (LeftOrRightEnum = {}));
        var Cloud = (function (_super) {
            __extends(Cloud, _super);
            function Cloud(game) {
                var strCloudImageName = '';
                if (game.rnd.sign() == -1)
                    strCloudImageName = 'imgCloudSmall';
                else
                    strCloudImageName = 'imgCloudLarge';
                _super.call(this, game, 0, 0, strCloudImageName);
                if (game.rnd.sign() == -1) {
                    this.leftOrRight = LeftOrRightEnum.Left;
                    this.velocity = game.rnd.between(0, 5);
                }
                else {
                    this.leftOrRight = LeftOrRightEnum.Right;
                    this.velocity = -game.rnd.between(0, 5);
                }
                this.x = game.rnd.between(0, game.width);
                this.y = game.rnd.between(0, game.height / 2);
                this.anchor.setTo(0.5);
                this.alpha = 0.5 + game.rnd.realInRange(0, 0.1 * this.velocity);
                if (game.rnd.sign() == -1)
                    this.scale.x = -1;
                else
                    this.scale.x = 1;
                game.add.existing(this);
                game.physics.enable(this);
                this.body.collideWorldBounds = false;
                this.body.setCircle(20);
                this.body.velocity.x = this.velocity;
            }
            Cloud.prototype.update = function () {
            };
            return Cloud;
        }(Phaser.Sprite));
        Client.Cloud = Cloud;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var CannonStateEnum;
        (function (CannonStateEnum) {
            CannonStateEnum[CannonStateEnum["Idle"] = 0] = "Idle";
            CannonStateEnum[CannonStateEnum["GoingUp"] = 1] = "GoingUp";
            CannonStateEnum[CannonStateEnum["FallingDown"] = 2] = "FallingDown";
        })(CannonStateEnum || (CannonStateEnum = {}));
        var Cannon = (function (_super) {
            __extends(Cannon, _super);
            function Cannon(game, x, y) {
                _super.call(this, game, x, y, 'imgCannon');
                this.timeToGoUp = 1000;
                this.anchor.setTo(0.5);
                game.add.existing(this);
                this.cannonState = CannonStateEnum.Idle;
                this.posInitialX = x;
                this.posInitialY = y;
                this.isHitOnGround = false;
            }
            Cannon.prototype.update = function () {
            };
            Cannon.prototype.goUp = function () {
                var tweenUp = this.game.add.tween(this).to({ x: this.x, y: this.y - 400 }, this.timeToGoUp, Phaser.Easing.Quadratic.Out, true);
                tweenUp.onComplete.add(this.fallDown, this);
                var tweenResize = this.game.add.tween(this.scale).to({ x: 0.5, y: 0.5 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
            };
            Cannon.prototype.fallDown = function () {
                this.cannonState = CannonStateEnum.FallingDown;
                var tweenUp = this.game.add.tween(this).to({ x: this.x, y: this.y + 405 }, this.timeToGoUp, Phaser.Easing.Quadratic.In, true);
                tweenUp.onComplete.add(this.hitOnGround, this);
                var tweenResize = this.game.add.tween(this.scale).to({ x: 0.3, y: 0.3 }, this.timeToGoUp, Phaser.Easing.Linear.None, true);
            };
            Cannon.prototype.hitOnGround = function () {
                this.game.add.audio('soundCannonFall', 1, false).play();
                this.visible = false;
                this.isHitOnGround = true;
                var tweenUp = this.game.add.tween(this.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tweenUp.onComplete.add(this.shootOver, this);
            };
            Cannon.prototype.shootOver = function () {
                this.cannonState = CannonStateEnum.Idle;
                this.position = new Phaser.Point(this.posInitialX, this.posInitialY);
                this.scale.set(1);
                this.visible = true;
            };
            Cannon.prototype.checkHitOnGround = function () {
                if (this.isHitOnGround) {
                    this.isHitOnGround = false;
                    return true;
                }
                else {
                    return false;
                }
            };
            Cannon.prototype.getCannonPosition = function () {
                return new Phaser.Point(this.x, this.y);
            };
            Cannon.prototype.isIdle = function () {
                if (this.cannonState == CannonStateEnum.Idle)
                    return true;
                else
                    return false;
            };
            Cannon.prototype.startFiring = function () {
                if (this.cannonState == CannonStateEnum.Idle) {
                    this.cannonState = CannonStateEnum.GoingUp;
                    this.goUp();
                    this.game.add.audio('soundBazooka', 1, false).play();
                    this.isHitOnGround = false;
                    return true;
                }
                else {
                    return false;
                }
            };
            Cannon.prototype.setPosition = function (pos) {
                this.position = pos;
                this.posInitialX = pos.x;
                this.posInitialY = pos.y;
            };
            return Cannon;
        }(Phaser.Sprite));
        Client.Cannon = Cannon;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        (function (BillboardTypeEnum) {
            BillboardTypeEnum[BillboardTypeEnum["Lives"] = 0] = "Lives";
            BillboardTypeEnum[BillboardTypeEnum["Points"] = 1] = "Points";
        })(Client.BillboardTypeEnum || (Client.BillboardTypeEnum = {}));
        var BillboardTypeEnum = Client.BillboardTypeEnum;
        var Billboard = (function (_super) {
            __extends(Billboard, _super);
            function Billboard(game, pos, billboardType) {
                if (billboardType == BillboardTypeEnum.Lives)
                    _super.call(this, game, pos.x, pos.y, 'imgBGLives');
                else
                    _super.call(this, game, pos.x, pos.y, 'imgBGPoints');
                game.add.existing(this);
                this.anchor.set(0.5);
                this.txt = this.game.add.text(pos.x + 20, pos.y, "", { font: "bold 32px Arial", fill: "#FFFFFF", align: "center" });
                this.txt.anchor.setTo(0.5);
                this.value = 0;
            }
            Billboard.prototype.update = function () {
            };
            Billboard.prototype.enlarge = function () {
                var normEnlarge = 300;
                var durationEnlarge = normEnlarge + normEnlarge * 0.25 * (Math.random() - 0.5);
                var normShrink = 500;
                var durationShrink = normShrink + normShrink * 0.25 * (Math.random() - 0.5);
                var tween = this.game.add.tween(this.scale).to({ x: 1.1, y: 1.1 }, durationEnlarge, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);
                var tweenText = this.game.add.tween(this.txt.scale).to({ x: 1.1, y: 1.1 }, durationEnlarge, Phaser.Easing.Bounce.In, true);
                tweenText.onComplete.add(function () { this.game.add.tween(this.txt.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);
            };
            Billboard.prototype.changeValue = function (newValue, isAnimate) {
                this.value = newValue;
                this.txt.setText(this.value.toString());
                if (isAnimate)
                    this.enlarge();
            };
            return Billboard;
        }(Phaser.Sprite));
        Client.Billboard = Billboard;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var MovingToLeftOrRightEnum;
        (function (MovingToLeftOrRightEnum) {
            MovingToLeftOrRightEnum[MovingToLeftOrRightEnum["NA"] = 0] = "NA";
            MovingToLeftOrRightEnum[MovingToLeftOrRightEnum["Left"] = 1] = "Left";
            MovingToLeftOrRightEnum[MovingToLeftOrRightEnum["Stopping"] = 2] = "Stopping";
            MovingToLeftOrRightEnum[MovingToLeftOrRightEnum["Right"] = 3] = "Right";
        })(MovingToLeftOrRightEnum || (MovingToLeftOrRightEnum = {}));
        var Rhino = (function (_super) {
            __extends(Rhino, _super);
            function Rhino(game, posInit) {
                _super.call(this, game, posInit.x, posInit.y, 'RhinoSpriteSheet', 1);
                this.normDurationForStopping = 2000;
                this.normVelocity = 50;
                this.animations.add('rhinoWalking', [5, 6, 7], 4, true);
                this.animations.add('rhinoStopping', [1, 2, 3, 4], 4, true);
                game.add.existing(this);
                this.anchor.set(0.5, 1);
                this.visible = false;
                game.physics.enable(this);
                this.body.collideWorldBounds = false;
                this.body.setCircle(20);
                this.body.velocity.x = 0;
                this.statusText = this.game.add.text(5, this.game.world.height / 2, "Rhino", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
                this.statusText.anchor.setTo(0, 0.5);
                this.initRhino();
            }
            Rhino.prototype.update = function () {
                this.statusText.setText("Rhino : " + this.movingToLeftOrRight.toString() + " LOC=" + Math.round(this.x) + "x" + Math.round(this.y));
                if (this.x < 0 || this.x > this.game.width)
                    this.restart();
            };
            Rhino.prototype.initRhino = function () {
                this.scale.x = 1;
                this.y = 470;
                this.x = 0;
                this.stop();
            };
            Rhino.prototype.isStoppingNow = function () { return this.movingToLeftOrRight == MovingToLeftOrRightEnum.Stopping; };
            Rhino.prototype.giveLife = function () {
                if (!this.visible) {
                    this.visible = true;
                    this.scale.x = 1;
                    this.movingToLeftOrRight = MovingToLeftOrRightEnum.Right;
                    this.body.velocity.x = this.normVelocity;
                    this.animations.play('rhinoWalking');
                }
            };
            Rhino.prototype.stop = function () {
                this.movingToLeftOrRight = MovingToLeftOrRightEnum.Stopping;
                this.body.velocity.x = 0;
                this.animations.stop('rhinoWalking');
                this.animations.play('rhinoStopping');
            };
            Rhino.prototype.restart = function () {
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
            };
            Rhino.prototype.turnAroundAndMove = function () {
                if (this.scale.x > 0) {
                    this.scale.x = -1;
                    this.movingToLeftOrRight = MovingToLeftOrRightEnum.Left;
                }
                else {
                    this.scale.x = 1;
                    this.movingToLeftOrRight = MovingToLeftOrRightEnum.Right;
                }
                this.body.velocity.x = this.scale.x * this.normVelocity;
            };
            return Rhino;
        }(Phaser.Sprite));
        Client.Rhino = Rhino;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var PhaseEnum;
        (function (PhaseEnum) {
            PhaseEnum[PhaseEnum["Hidden"] = 0] = "Hidden";
            PhaseEnum[PhaseEnum["Moving"] = 1] = "Moving";
            PhaseEnum[PhaseEnum["Stopping"] = 2] = "Stopping";
            PhaseEnum[PhaseEnum["Shooting"] = 3] = "Shooting";
            PhaseEnum[PhaseEnum["ShotComplete"] = 4] = "ShotComplete";
        })(PhaseEnum || (PhaseEnum = {}));
        var JeepFoo = (function (_super) {
            __extends(JeepFoo, _super);
            function JeepFoo(game) {
                _super.call(this, game, 0, 0, 'imgJeepFoo');
                this.minVelocity = 50;
                game.add.existing(this);
                this.anchor.set(0.5, 1);
                this.phase = PhaseEnum.Hidden;
                game.physics.enable(this);
                this.body.collideWorldBounds = false;
                this.body.setCircle(20);
                this.body.velocity.x = 0;
                this.scale.x = 1;
            }
            JeepFoo.prototype.update = function () {
                if (this.phase == PhaseEnum.Moving && Math.abs(this.body.velocity.x) < this.minVelocity) {
                    this.body.acceleration.x = 0;
                    this.body.velocity.x = this.minVelocity * this.scale.x;
                }
            };
            JeepFoo.prototype.showMe = function (rhino) {
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
            };
            JeepFoo.prototype.hideMe = function () {
                this.x = this.game.width;
                this.visible = false;
                this.body.velocity.x = 0;
                this.body.acceleration.x = 0;
                this.phase = PhaseEnum.Hidden;
            };
            JeepFoo.prototype.stopToPrepareShooting = function (rhino) {
                var _this = this;
                this.body.velocity.x = 0;
                this.body.acceleration.x = 0;
                this.phase = PhaseEnum.Stopping;
                setTimeout(function () { return _this.shoot(); }, 5000);
                rhino.stop();
            };
            JeepFoo.prototype.shoot = function () {
                if (this.phase == PhaseEnum.Stopping)
                    this.phase = PhaseEnum.Shooting;
            };
            JeepFoo.prototype.isMoving = function () { return this.phase == PhaseEnum.Moving; };
            JeepFoo.prototype.isShooting = function () { return this.phase == PhaseEnum.Shooting; };
            return JeepFoo;
        }(Phaser.Sprite));
        Client.JeepFoo = JeepFoo;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var Volcano = (function (_super) {
            __extends(Volcano, _super);
            function Volcano(game, x, y) {
                _super.call(this, game, 0, 0);
                game.add.existing(this);
                this.volcanoCrest = new Phaser.Sprite(game, x, y, 'imgVolcanoCrest');
                this.volcanoCrest.anchor.setTo(0.5, 1);
                this.volcanoSmoke = new Phaser.Sprite(game, x, y - this.volcanoCrest.height, 'imgVolcanoSmoke');
                this.volcanoSmoke.anchor.set(0, 1);
                this.addChild(this.volcanoCrest);
                this.addChild(this.volcanoSmoke);
                this.smokeFadeOut();
            }
            Volcano.prototype.update = function () {
            };
            Volcano.prototype.smokeFadeIn = function () {
                var tween = this.game.add.tween(this.volcanoSmoke).to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.smokeFadeOut, this);
            };
            Volcano.prototype.smokeFadeOut = function () {
                var tween = this.game.add.tween(this.volcanoSmoke).to({ alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.smokeFadeIn, this);
            };
            Volcano.prototype.isInArea = function (x, y) {
                if (x > this.volcanoCrest.left
                    && x < this.volcanoCrest.right
                    && y > this.volcanoCrest.top
                    && y < this.volcanoCrest.bottom)
                    return true;
                else
                    return false;
            };
            Volcano.prototype.tickleMe = function (x, y) {
                if (this.isInArea(x, y)) {
                    var tween = this.game.add.tween(this.volcanoCrest.scale).to({ x: 1.05, y: 1.15 }, 200, Phaser.Easing.Bounce.In, true);
                    tween.onComplete.add(this.releaseTickle, this);
                    return true;
                }
                else {
                    return false;
                }
            };
            Volcano.prototype.releaseTickle = function () {
                this.game.add.tween(this.volcanoCrest.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            };
            Volcano.prototype.getFireballLocation = function () { return new Phaser.Point(this.volcanoCrest.x, this.volcanoCrest.y - this.volcanoCrest.height + 50); };
            return Volcano;
        }(Phaser.Sprite));
        Client.Volcano = Volcano;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var MotionStateEnum;
        (function (MotionStateEnum) {
            MotionStateEnum[MotionStateEnum["Idle"] = 0] = "Idle";
            MotionStateEnum[MotionStateEnum["Moving"] = 1] = "Moving";
        })(MotionStateEnum || (MotionStateEnum = {}));
        var Jeep = (function (_super) {
            __extends(Jeep, _super);
            function Jeep(game, x, y) {
                _super.call(this, game, x, y, 'imgJeep');
                this.durationEngineUp = 250;
                this.durationEngineDown = 1250;
                game.add.existing(this);
                this.anchor.set(0.5, 1);
                this.explosion = new Phaser.Sprite(game, 0, 0, "JeepExplosion", 1);
                this.explosion.animations.add('jeepExplosionAnimation', null, 5, false);
                this.explosion.anchor.setTo(0.5, 1);
                this.explosion.visible = false;
                this.explosion.scale.setTo(1.2);
                this.addChild(this.explosion);
                game.physics.enable(this);
                this.body.collideWorldBounds = false;
                this.body.setCircle(20);
                this.body.velocity.x = 0;
                this.scale.x = 1;
                this.motionState = MotionStateEnum.Idle;
                this.engineMovementUp();
            }
            Jeep.prototype.update = function () {
            };
            Jeep.prototype.engineMovementUp = function () {
                var duration = this.durationEngineUp + this.durationEngineUp * 0.25 * (Math.random() - 0.5);
                var tween = this.game.add.tween(this.scale).to({ y: 1.015 }, duration, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(this.engineMovementDown, this);
            };
            Jeep.prototype.engineMovementDown = function () {
                var duration = this.durationEngineDown + this.durationEngineDown * 0.25 * (Math.random() - 0.5);
                var tween = this.game.add.tween(this.scale).to({ y: 1.00 }, duration, Phaser.Easing.Bounce.Out, true);
                tween.onComplete.add(this.engineMovementUp, this);
            };
            Jeep.prototype.bangAnim = function () {
                var tween = this.game.add.tween(this.scale).to({ y: 1.05 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
            };
            Jeep.prototype.isInArea = function (x, y) {
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
            };
            Jeep.prototype.startMotion = function (x) {
                if (this.motionState == MotionStateEnum.Idle) {
                    this.xMovementOffset = x - this.x;
                    this.xPrevious = this.x;
                    this.xTouchBeforeMotion = x;
                    this.motionState = MotionStateEnum.Moving;
                }
            };
            Jeep.prototype.endMotion = function () {
                this.xMovementOffset = 0;
                this.motionState = MotionStateEnum.Idle;
            };
            Jeep.prototype.tickleMe = function (x, y) {
                if (this.isInArea(x, y)) {
                    var tween = this.game.add.tween(this.scale).to({ y: 1.05 }, 200, Phaser.Easing.Bounce.In, true);
                    tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
                    return true;
                }
                else {
                    return false;
                }
            };
            Jeep.prototype.isMoving = function () { return this.motionState == MotionStateEnum.Moving; };
            Jeep.prototype.isIdle = function () { return this.motionState == MotionStateEnum.Idle; };
            Jeep.prototype.getCanonLocation = function () { return new Phaser.Point(this.x, this.y - 200); };
            Jeep.prototype.showJeepExplosion = function () {
                this.explosion.visible = true;
                this.explosion.animations.play('jeepExplosionAnimation');
                var tween = this.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.hideJeepExplosion, this);
            };
            Jeep.prototype.hideJeepExplosion = function () {
                this.explosion.visible = false;
                this.alpha = 1;
                this.explosion.alpha = 1;
            };
            return Jeep;
        }(Phaser.Sprite));
        Client.Jeep = Jeep;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y, num) {
                _super.call(this, game, x, y, 'level01-sprites', 1);
                this.anchor.setTo(0.5);
                this.animations.add('fly', [0, 1], 5, true);
                game.add.existing(this);
                this.num = num;
                game.physics.enable(this);
                this.body.collideWorldBounds = true;
                this.body.setCircle(20);
                this.footerText = this.game.add.text(10, 15 * num, "Bilgin Eşme", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            }
            Player.prototype.update = function () {
                this.body.velocity.x = 0;
                var velocity = this.game.rnd.integerInRange(1, 100);
                this.footerText.setText(velocity.toString());
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x = -velocity;
                    this.animations.play('fly');
                    if (this.scale.x === -1)
                        this.scale.x = 1;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x = velocity;
                    this.animations.play('fly');
                    if (this.scale.x === 1)
                        this.scale.x = -1;
                }
                else {
                    this.animations.frame = 0;
                }
            };
            return Player;
        }(Phaser.Sprite));
        Client.Player = Player;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
            };
            Boot.prototype.create = function () {
                statusbar.visible = false;
                this.stage.setBackgroundColor(0xFFFFFF);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                if (this.game.device.desktop) {
                    this.scale.pageAlignHorizontally = true;
                }
                else {
                    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.minWidth = 480;
                    this.scale.minHeight = 260;
                    this.scale.maxWidth = 1024;
                    this.scale.maxHeight = 768;
                    this.scale.forceLandscape = true;
                    this.scale.pageAlignHorizontally = true;
                    this.scale.refresh();
                }
                this.game.state.start('Preloader', true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var GameStateEnum;
        (function (GameStateEnum) {
            GameStateEnum[GameStateEnum["NA"] = 0] = "NA";
            GameStateEnum[GameStateEnum["Running"] = 1] = "Running";
            GameStateEnum[GameStateEnum["LostOneLife"] = 2] = "LostOneLife";
            GameStateEnum[GameStateEnum["GameOver"] = 9] = "GameOver";
        })(GameStateEnum || (GameStateEnum = {}));
        var Action = (function (_super) {
            __extends(Action, _super);
            function Action() {
                _super.apply(this, arguments);
                this.gameState = GameStateEnum.NA;
                this.maxJeepsFoo = 5;
                this.numLives = 3;
                this.points = 0;
                this.pointsForShootingMovingJeep = 100;
                this.pointsForShootingMotionlessJeep = 25;
            }
            Action.prototype.create = function () {
                var _this = this;
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.gameState = GameStateEnum.Running;
                this.add.image(0, 0, 'imgSky');
                this.clouds = new Array(5);
                for (var i = 0; i < this.clouds.length; i++)
                    this.clouds[i] = new Client.Cloud(this.game);
                this.volcano = new Client.Volcano(this.game, this.game.width / 2, 418);
                this.add.image(0, 332, 'imgBushes');
                this.add.image(0, 412, 'imgGround3');
                this.jeepsFoo = new Array(this.maxJeepsFoo);
                for (var i = 0; i < this.jeepsFoo.length; i++) {
                    this.jeepsFoo[i] = new Client.JeepFoo(this.game);
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
                this.rhino = new Client.Rhino(this.game, new Phaser.Point(0, 0));
                this.jeep = new Client.Jeep(this.game, 930, 630);
                this.cannon = new Client.Cannon(this.game, this.jeep.getCanonLocation().x, this.jeep.getCanonLocation().y);
                this.jeepExplosion = this.add.sprite(0, 0, 'imgExplosion');
                this.jeepExplosion.anchor.setTo(0.5);
                this.jeepExplosion.visible = false;
                this.bang = this.add.sprite(0, 0, 'imgBang');
                this.bang.anchor.setTo(0.5);
                this.bang.visible = false;
                this.fireballs = new Array(Client.Fireball.maxFireballs);
                for (var i = 0; i < this.fireballs.length; i++) {
                    this.fireballs[i] = new Client.Fireball(this.game, this.volcano.getFireballLocation().x, this.volcano.getFireballLocation().y);
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
                this.billboardLives = new Client.Billboard(this.game, new Phaser.Point(80, 40), Client.BillboardTypeEnum.Lives);
                this.billboardLives.anchor.setTo(0.5);
                this.billboardLives.changeValue(this.numLives, false);
                this.billboardPoints = new Client.Billboard(this.game, new Phaser.Point(this.game.width - 100, 40), Client.BillboardTypeEnum.Points);
                this.billboardPoints.anchor.setTo(0.5);
                this.billboardPoints.changeValue(this.points, false);
                this.gameOver = new Client.GameOver(this.game);
                this.gameOver.anchor.setTo(0.5);
                this.game.input.onTap.add(this.onTap, this);
                this.game.input.addMoveCallback(this.onMove, this);
                setTimeout(function () { return _this.createRandomJeepFoo(); }, 1000);
                setTimeout(function () { return _this.rhino.giveLife(); }, 1000);
                setTimeout(function () { return _this.createRandomFireball(); }, 5000);
            };
            Action.prototype.update = function () {
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
                this.statusText2.setText("Fireball Duration : " + Client.Fireball.durationForNewFireball);
            };
            Action.prototype.onTap = function (pointer, doubleTap) {
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
            };
            Action.prototype.onMove = function (pointer, x, y, isClick) {
                if (this.cannon.isIdle())
                    this.cannon.setPosition(this.jeep.getCanonLocation());
            };
            Action.prototype.playTickSound = function () { this.add.audio('click', 1, false).play(); };
            Action.prototype.decreaseOneLife = function () {
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
            };
            Action.prototype.addPoints = function (p) {
                if (this.gameState == GameStateEnum.Running) {
                    this.points += p;
                    this.billboardPoints.changeValue(this.points, true);
                }
            };
            Action.prototype.cleanAllFooElements = function () {
                if (this.jeep.x > this.jeep.xPrevious)
                    this.jeep.scale.x = -1;
                else if (this.jeep.x < this.jeep.xPrevious)
                    this.jeep.scale.x = 1;
            };
            Action.prototype.handleJeepMovement = function () {
                if (this.gameState == GameStateEnum.Running && this.jeep.isMoving()) {
                    this.jeep.x = this.game.input.x - this.jeep.xMovementOffset;
                    this.cleanAllFooElements();
                    this.jeep.xPrevious = this.jeep.x;
                    this.statusText1.setText("Moving " + this.jeep.xPrevious);
                }
            };
            Action.prototype.handleGameOver = function () {
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
            };
            Action.prototype.handleLostOneLife = function () {
                for (var i = 0; i < this.fireballs.length; i++)
                    this.fireballs[i].hideMe();
                for (var i = 0; i < this.jeepsFoo.length; i++)
                    this.jeepsFoo[i].hideMe();
                this.gameState = GameStateEnum.LostOneLife;
                this.txtLargeMessage.setText("LOST ONE LIFE");
                this.txtLargeMessage.visible = true;
                var tweenText = this.game.add.tween(this.txtLargeMessage.scale).to({ x: 1.1, y: 1.1 }, 1500, Phaser.Easing.Bounce.In, true);
                tweenText.onComplete.add(function () {
                    var _this = this;
                    this.game.add.tween(this.txtLargeMessage.scale).to({ x: 1, y: 1 }, 3000, Phaser.Easing.Elastic.Out, true);
                    this.gameState = GameStateEnum.Running;
                    this.txtLargeMessage.visible = false;
                    setTimeout(function () { return _this.createRandomJeepFoo(); }, 2000);
                }, this);
            };
            Action.prototype.checkJeepHit = function () {
                var _this = this;
                if (this.cannon.checkHitOnGround()) {
                    this.createBoom(this.cannon.getCannonPosition().x, this.cannon.getCannonPosition().y);
                    for (var i = 0; i < this.jeepsFoo.length; i++) {
                        if (this.jeepsFoo[i].visible && this.jeepsFoo[i].overlap(this.cannon)) {
                            if (this.jeepsFoo[i].isMoving())
                                this.addPoints(this.pointsForShootingMovingJeep);
                            else
                                this.addPoints(this.pointsForShootingMotionlessJeep);
                            this.jeepsFoo[i].hideMe();
                            this.createExplosion(this.cannon.getCannonPosition().x, this.cannon.getCannonPosition().y);
                            setTimeout(function () { return _this.createRandomJeepFoo(); }, 2000);
                            if (this.rhino.isStoppingNow())
                                this.rhino.restart();
                            Client.Fireball.decreaseDurationForNewFireball();
                        }
                    }
                }
            };
            Action.prototype.checkJeepRhinoVicinity = function () {
                for (var i = 0; i < this.jeepsFoo.length; i++) {
                    if (this.jeepsFoo[i].visible == true && this.jeepsFoo[i].isMoving() && this.rhino.visible == true) {
                        if (Math.abs(this.jeepsFoo[i].x - this.rhino.x) < this.jeepsFoo[i].vicinityToRhino) {
                            this.jeepsFoo[i].stopToPrepareShooting(this.rhino);
                        }
                    }
                }
            };
            Action.prototype.checkRhinoShooting = function () {
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
            };
            Action.prototype.checkFireballHit = function () {
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
            };
            Action.prototype.createBoom = function (x, y) {
                this.boom.position.set(x, y);
                this.boom.visible = true;
                this.boom.alpha = 0;
                var tween = this.game.add.tween(this.boom.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.boom.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
                var tweenAlpha = this.game.add.tween(this.boom).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                tweenAlpha.onComplete.add(function () { this.game.add.tween(this.boom).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
            };
            Action.prototype.createJeepExplosion = function (x, y) {
                this.jeepExplosion.position.set(x, y);
                this.jeepExplosion.visible = true;
                this.jeepExplosion.alpha = 0;
                var tween = this.game.add.tween(this.jeepExplosion.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.jeepExplosion.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
                var tweenAlpha = this.game.add.tween(this.jeepExplosion).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                tweenAlpha.onComplete.add(function () { this.game.add.tween(this.jeepExplosion).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
            };
            Action.prototype.createBang = function (x, y) {
                this.bang.position.set(x, y);
                this.bang.visible = true;
                this.bang.alpha = 0;
                var tween = this.game.add.tween(this.bang.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.bang.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
                var tweenAlpha = this.game.add.tween(this.bang).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                tweenAlpha.onComplete.add(function () { this.game.add.tween(this.bang).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
            };
            Action.prototype.createExplosion = function (x, y) {
                this.explosion.position.set(x, y);
                this.explosion.visible = true;
                this.explosion.alpha = 0;
                var tween = this.game.add.tween(this.explosion.scale).to({ x: 1.25, y: 1.25 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(function () { this.game.add.tween(this.explosion.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true); }, this);
                var tweenAlpha = this.game.add.tween(this.explosion).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                tweenAlpha.onComplete.add(function () { this.game.add.tween(this.explosion).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true); }, this);
            };
            Action.prototype.createRandomJeepFoo = function () {
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
            };
            Action.prototype.createRandomFireball = function () {
                var _this = this;
                if (false && this.gameState == GameStateEnum.Running) {
                    for (var i = 0; i < this.fireballs.length; i++) {
                        if (this.fireballs[i].visible == false) {
                            this.fireballs[i].erupt();
                            break;
                        }
                    }
                }
                setTimeout(function () { return _this.createRandomFireball(); }, Client.Fireball.durationForNewFireball);
            };
            return Action;
        }(Phaser.State));
        Client.Action = Action;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var Level01 = (function (_super) {
            __extends(Level01, _super);
            function Level01() {
                _super.apply(this, arguments);
            }
            Level01.prototype.create = function () {
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.background = this.add.sprite(0, 0, 'level01-sprites', 'background');
                this.player1 = new Client.Player(this.game, this.world.centerX, 200, 1);
                this.player1.anchor.setTo(0, 5);
                this.player2 = new Client.Player(this.game, this.world.centerX, 500, 2);
                this.player2.anchor.setTo(0, 5);
                this.footerText = this.game.add.text(this.world.centerX, this.world.height - 10, "Use Right and Left arrow keys to move the bat", { font: "16px Arial", fill: "#FFFFFF", align: "center" });
                this.footerText.anchor.setTo(0.5);
            };
            Level01.prototype.update = function () {
                this.footerText.setText(this.game.rnd.integerInRange(1, 100).toString());
            };
            return Level01;
        }(Phaser.State));
        Client.Level01 = Level01;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.apply(this, arguments);
            }
            MainMenu.prototype.create = function () {
                this.background = this.add.sprite(0, 0, 'titlepage');
                this.background.alpha = 0;
                this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
                this.logo.anchor.setTo(0.5);
                this.add.tween(this.background).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                this.add.tween(this.logo).to({ y: 220 }, 1000, Phaser.Easing.Elastic.Out, true, 500);
                this.game.debug.text("Click the logo to start the game", this.world.centerX, this.world.height - 20, "red");
                this.input.onDown.addOnce(this.fadeOut, this);
            };
            MainMenu.prototype.fadeOut = function () {
                this.add.audio('click', 1, false).play();
                this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                var tween = this.add.tween(this.logo).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startGame, this);
            };
            MainMenu.prototype.startGame = function () {
                this.game.state.start('Action', true, false);
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
var FirstPhaser;
(function (FirstPhaser) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
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
            };
            Preloader.prototype.create = function () {
                var tween = this.add.tween(this.loaderText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preloader.prototype.startMainMenu = function () {
                this.game.state.start('Action', true, false);
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = FirstPhaser.Client || (FirstPhaser.Client = {}));
})(FirstPhaser || (FirstPhaser = {}));
//# sourceMappingURL=game.js.map