/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","./Renderable/InfoBox","./Renderable/Severity","./Renderable/ProgressBar","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Icons"],function(e,t,o,n,a,i,r,l){"use strict";return new(function(){function t(){this.selectorBody=".t3js-body",this.selectorMainContent=".t3js-module-body"}return t.prototype.initialize=function(){var t=this;this.registerInstallToolRoutes(),o(document).on("click",".t3js-login-lockInstallTool",function(e){e.preventDefault(),t.logout()}),o(document).on("click",".t3js-login-login",function(e){e.preventDefault(),t.login()}),o(document).on("keydown","#t3-install-form-password",function(e){13===e.keyCode&&(e.preventDefault(),o(".t3js-login-login").click())}),o(document).on("click",".card .btn",function(t){t.preventDefault();var n=o(t.currentTarget),a=n.data("require"),i=n.data("inline");if(void 0!==i&&1===parseInt(i,10))e([a],function(e){e.initialize(n)});else{var s=n.closest(".card").find(".card-title").html(),c=n.data("modalSize")||r.sizes.large;l.getIcon("spinner-circle",l.sizes.default,null,null,l.markupIdentifiers.inline).done(function(t){var n={type:r.types.default,title:s,size:c,content:o('<div class="modal-loading">').append(t),additionalCssClasses:["install-tool-modal"],callback:function(t){e([a],function(e){e.initialize(t)})}};r.advanced(n)})}}),this.executeSilentConfigurationUpdate()},t.prototype.registerInstallToolRoutes=function(){void 0===TYPO3.settings&&(TYPO3.settings={ajaxUrls:{icons:"?install[controller]=icon&install[action]=getIcon",icons_cache:"?install[controller]=icon&install[action]=getCacheIdentifier"}})},t.prototype.getUrl=function(e,t){var n=o(this.selectorBody).data("context"),a=location.href;return a=a.replace(location.search,""),void 0===t&&(t=o(this.selectorBody).data("controller")),a=a+"?install[controller]="+t,void 0!==n&&""!==n&&(a=a+"&install[context]="+n),void 0!==e&&(a=a+"&install[action]="+e),a},t.prototype.executeSilentConfigurationUpdate=function(){var e=this;this.updateLoadingInfo("Checking session and executing silent configuration update"),o.ajax({url:this.getUrl("executeSilentConfigurationUpdate","layout"),cache:!1,success:function(t){!0===t.success?e.executeSilentExtensionConfigurationSynchronization():e.executeSilentConfigurationUpdate()},error:function(t){e.handleAjaxError(t)}})},t.prototype.executeSilentExtensionConfigurationSynchronization=function(){var e=this,t=o(this.selectorBody);this.updateLoadingInfo("Executing silent extension configuration synchronization"),o.ajax({url:this.getUrl("executeSilentExtensionConfigurationSynchronization","layout"),cache:!1,success:function(o){if(!0===o.success)e.loadMainLayout();else{var i=n.render(a.error,"Something went wrong","");t.empty().append(i)}},error:function(t){e.handleAjaxError(t)}})},t.prototype.loadMainLayout=function(){var e=this,t=o(this.selectorBody);this.updateLoadingInfo("Loading main layout"),o.ajax({url:this.getUrl("mainLayout","layout"),cache:!1,success:function(i){if(!0===i.success&&"undefined"!==i.html&&i.html.length>0){if(t.empty().append(i.html),"backend"!==o(e.selectorBody).data("context")){var r=t.data("controller");t.find('.t3js-mainmodule[data-controller="'+r+'"]').addClass("active")}e.loadCards()}else{var l=n.render(a.error,"Something went wrong","");t.empty().append(l)}},error:function(t){e.handleAjaxError(t)}})},t.prototype.handleAjaxError=function(e,t){var i;if(403===e.status){"backend"===o(this.selectorBody).data("context")?(i=n.render(a.error,"The install tool session expired. Please reload the backend and try again."),o(this.selectorBody).empty().append(i)):this.checkEnableInstallToolFile()}else{var r=this.getUrl(void 0,"upgrade");i=o('<div class="t3js-infobox callout callout-sm callout-danger"><div class="callout-body"><p>Something went wrong. Please use <b><a href="'+r+'">Check for broken extensions</a></b> to see if a loaded extension breaks this part of the install tool and unload it.</p><p>The box below may additionally reveal further details on what went wrong depending on your debug settings. It may help to temporarily switch to debug mode using <b>Settings > Configuration Presets > Debug settings.</b></p><p>If this error happens at an early state and no full exception back trace is shown, it may also help to manually increase debugging output in <code>typo3conf/LocalConfiguration.php</code>:<code>[\'BE\'][\'debug\'] => true</code>, <code>[\'SYS\'][\'devIPmask\'] => \'*\'</code>, <code>[\'SYS\'][\'displayErrors\'] => 1</code>,<code>[\'SYS\'][\'systemLogLevel\'] => 0</code>, <code>[\'SYS\'][\'exceptionalErrors\'] => 12290</code></p></div></div><div class="panel-group" role="tablist" aria-multiselectable="true"><div class="panel panel-default panel-flat searchhit"><div class="panel-heading" role="tab" id="heading-error"><h3 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse-error" aria-expanded="true" aria-controls="collapse-error" class="collapsed"><span class="caret"></span><strong>Ajax error</strong></a></h3></div><div id="collapse-error" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-error"><div class="panel-body">'+e.responseText+"</div></div></div></div>"),void 0!==t?o(t).empty().html(i):o(this.selectorBody).empty().html(i)}},t.prototype.checkEnableInstallToolFile=function(){var e=this;o.ajax({url:this.getUrl("checkEnableInstallToolFile"),cache:!1,success:function(t){!0===t.success?e.checkLogin():e.showEnableInstallTool()},error:function(t){e.handleAjaxError(t)}})},t.prototype.showEnableInstallTool=function(){var e=this;o.ajax({url:this.getUrl("showEnableInstallToolFile"),cache:!1,success:function(t){!0===t.success&&o(e.selectorBody).empty().append(t.html)},error:function(t){e.handleAjaxError(t)}})},t.prototype.checkLogin=function(){var e=this;o.ajax({url:this.getUrl("checkLogin"),cache:!1,success:function(t){!0===t.success?e.loadMainLayout():e.showLogin()},error:function(t){e.handleAjaxError(t)}})},t.prototype.showLogin=function(){var e=this;o.ajax({url:this.getUrl("showLogin"),cache:!1,success:function(t){!0===t.success&&o(e.selectorBody).empty().append(t.html)},error:function(t){e.handleAjaxError(t)}})},t.prototype.login=function(){var e=this,t=o(".t3js-login-output"),r=i.render(a.loading,"Loading...","");t.empty().html(r),o.ajax({url:this.getUrl(),cache:!1,method:"POST",data:{install:{action:"login",token:o("[data-login-token]").data("login-token"),password:o(".t3-install-form-input-text").val()}},success:function(o){!0===o.success?e.executeSilentConfigurationUpdate():o.status.forEach(function(e){var o=n.render(e.severity,e.title,e.message);t.empty().html(o)})},error:function(t){e.handleAjaxError(t)}})},t.prototype.logout=function(){var e=this;o.ajax({url:this.getUrl("logout"),cache:!1,success:function(t){!0===t.success&&e.showEnableInstallTool()},error:function(t){e.handleAjaxError(t)}})},t.prototype.loadCards=function(){var e=this,t=o(this.selectorMainContent);o.ajax({url:this.getUrl("cards"),cache:!1,success:function(e){if(!0===e.success&&"undefined"!==e.html&&e.html.length>0)t.empty().append(e.html);else{var o=n.render(a.error,"Something went wrong","");t.empty().append(o)}},error:function(t){e.handleAjaxError(t)}})},t.prototype.updateLoadingInfo=function(e){o(this.selectorBody).find("#t3js-ui-block-detail").text(e)},t}())});