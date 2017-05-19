/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery"],function(a,g){a.ia=function(a,c,d){this.Init(a,c,d)};o_("Message",a.ia,a);a.ia.ho={CONFIRMATION:"confirmation",INFO:"info",WARNING:"warning",ERROR:"error",FATAL:"fatal"};o_("Message.SEVERITY_TYPE",a.ia.ho,a);a.ia.Vc={FATAL:5,ERROR:4,WARNING:3,INFO:2,CONFIRMATION:1};o_("Message.SEVERITY_LEVEL",a.ia.Vc,a);a.b.sa(a.ia,a.b,"oj.Message");a.ia.prototype.Init=function(b,c,d){a.ia.u.Init.call(this);this.summary=b;this.detail=c;this.severity=d||a.ia.ho.ERROR};a.b.g("Message.prototype.Init",
{Init:a.ia.prototype.Init});a.ia.prototype.gfa=function(){return!0};a.ia.prototype.cr=function(b){return b&&a.ia.tA(this.severity)===a.ia.tA(b.severity)&&this.summary===b.summary&&this.detail===b.detail?!0:!1};a.b.g("Message.prototype.equals",{cr:a.ia.prototype.cr});a.ia.prototype.clone=function(){return new a.ia(this.summary,this.detail,this.severity)};a.b.g("Message.prototype.clone",{clone:a.ia.prototype.clone});a.ia.tA=function(b){b&&("string"===typeof b?(b=a.ia.gQ.indexOf(b,1),b=-1===b?a.ia.Vc.ERROR:
b):"number"===typeof b&&b<a.ia.Vc.CONFIRMATION&&b>a.ia.Vc.FATAL&&(b=a.ia.Vc.ERROR));return b?b:a.ia.Vc.ERROR};o_("Message.getSeverityLevel",a.ia.tA,a);a.ia.oIa=function(b){var c;b&&("string"===typeof b?(c=a.ia.gQ.indexOf(b,1),-1===c&&(b=a.ia.ho.ERROR)):"number"===typeof b&&(b=b<a.ia.Vc.CONFIRMATION&&b>a.ia.Vc.FATAL?a.ia.ho.ERROR:a.ia.gQ[b]));return b||a.ia.ho.ERROR};o_("Message.getSeverityType",a.ia.oIa,a);a.ia.pA=function(b){var c=-1,d;b&&0<b.length&&g.each(b,function(b,f){f&&(d=a.ia.tA(f.severity));
c=c<d?d:c});return c};o_("Message.getMaxSeverity",a.ia.pA,a);a.ia.isValid=function(b){return a.ia.pA(b)>=a.ia.Vc.ERROR?!1:!0};o_("Message.isValid",a.ia.isValid,a);a.ia.gQ=["none",a.ia.ho.CONFIRMATION,a.ia.ho.INFO,a.ia.ho.WARNING,a.ia.ho.ERROR,a.ia.ho.FATAL];a.be=function(a,c,d,e){this.Init(a,c,d,e)};a.b.sa(a.be,a.ia,"oj.ComponentMessage");a.be.yx={rP:"shown",bP:"hidden"};a.be.yma={display:a.be.yx.rP,context:""};a.be.prototype.Init=function(b,c,d,e){a.be.u.Init.call(this,b,c,d);this.Yb=g.extend({},
a.be.yma,e)};a.be.prototype.cr=function(b){return a.be.u.cr.call(this,b)&&this.Yb.display===b.Yb.display};a.be.prototype.clone=function(){return new a.be(this.summary,this.detail,this.severity,this.Yb)};a.be.prototype.gfa=function(){return!(this.Yb&&this.Yb.display&&this.Yb.display===a.be.yx.bP)};a.be.prototype.dua=function(){this.Yb&&a.be.yx.bP===this.Yb.display&&(this.Yb.display=a.be.yx.rP)};a.be.prototype.S$=function(){return this.Yb&&this.Yb.context?!0:!1}});