package com.vamoslac.myapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.realm.react.RealmReactPackage;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.airbnb.android.react.maps.MapsPackage;
import com.taskrabbit.zendesk.RNZendeskChatPackage;
import com.zopim.android.sdk.api.ZopimChat;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new RealmReactPackage(),
          new SvgPackage(),
          new LottiePackage(),
          new GoogleAnalyticsBridgePackage(),
          new RNDeviceInfo(),
          new ReactNativeI18n(),
          new MapsPackage(),
          new RNZendeskChatPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // ZopimChat.init("5fb55130-f94f-460e-a0cf-d41081e7d54b").build();
    ZopimChat.init("ZXuFuBFUS919FLIZkz5GlaIOEbzRUadx");
    SoLoader.init(this, /* native exopackage */ false);
  }
}
