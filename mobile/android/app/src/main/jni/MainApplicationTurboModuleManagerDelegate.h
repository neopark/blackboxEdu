#include <memory>
#include <string>

#include <ReactCommon/TurboModuleManagerDelegate.h>
#include <fbjni/fbjni.h>

namespace facebook {
  namespace react {
    class MainApplicationTurboModuleManagerDelegate : public jni::HybridClass<MainApplicationTurboModuleManagerDelegate, TurboModuleManagerDelegate> {
      public: static constexpr auto kJavaDescriptor = "Lcom/app/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate;";

      static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject>);

      static void registerNatives();

      std::shared_ptr<TurboModule> getTurboModule(const std::string name, const std::shared_ptr<CallInvoker> jsInvoker) override;

      std::shared_ptr<TurboModule> getTurboModule(const std::string name, const JavaTurboModule::InitParams &params) override;

      bool canCreateTurboModule(std::string name);
    };
  }
}
