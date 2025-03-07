#import "RNFirebaseStorage.h"

#if __has_include(<FirebaseStorage/FIRStorage.h>)
#import "RNFirebaseEvents.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import <Photos/Photos.h>
#import "Firebase.h"

@implementation RNFirebaseStorage

RCT_EXPORT_MODULE(RNFirebaseStorage);

// Run on a different thread
- (dispatch_queue_t)methodQueue {
    return dispatch_queue_create("com.invertase.firebase.storage", DISPATCH_QUEUE_SERIAL);
}

/**
 Reject a promise with a storage exception

 @param reject RCTPromiseRejectBlock
 @param error NSError
 */
- (void) promiseRejectStorageException:(RCTPromiseRejectBlock) reject error:(NSError *)error {
    NSString *code = @"storage/unknown";
    NSString *message = [error localizedDescription];

    NSDictionary *userInfo = [error userInfo];
    NSError *underlyingError = userInfo[NSUnderlyingErrorKey];
    NSString *underlyingErrorDescription = [underlyingError localizedDescription];

    switch (error.code) {
        case FIRStorageErrorCodeUnknown:
            if ([underlyingErrorDescription isEqualToString:@"The operation couldn’t be completed. Permission denied"]) {
                code = @"storage/invalid-device-file-path";
                message = @"The specified device file path is invalid or is restricted.";
            } else {
                code = @"storage/unknown";
                message = @"An unknown error has occurred.";
            }
            break;
        case FIRStorageErrorCodeObjectNotFound:
            code = @"storage/object-not-found";
            message = @"No object exists at the desired reference.";
            break;
        case FIRStorageErrorCodeBucketNotFound:
            code = @"storage/bucket-not-found";
            message = @"No bucket is configured for Firebase Storage.";
            break;
        case FIRStorageErrorCodeProjectNotFound:
            code = @"storage/project-not-found";
            message = @"No project is configured for Firebase Storage.";
            break;
        case FIRStorageErrorCodeQuotaExceeded:
            code = @"storage/quota-exceeded";
            message = @"Quota on your Firebase Storage bucket has been exceeded.";
            break;
        case FIRStorageErrorCodeUnauthenticated:
            code = @"storage/unauthenticated";
            message = @"User is unauthenticated. Authenticate and try again.";
            break;
        case FIRStorageErrorCodeUnauthorized:
            code = @"storage/unauthorized";
            message = @"User is not authorized to perform the desired action.";
            break;
        case FIRStorageErrorCodeRetryLimitExceeded:
            code = @"storage/retry-limit-exceeded";
            message = @"The maximum time limit on an operation (upload, download, delete, etc.) has been exceeded.";
            break;
        case FIRStorageErrorCodeNonMatchingChecksum:
            code = @"storage/non-matching-checksum";
            message = @"File on the client does not match the checksum of the file received by the server.";
            break;
        case FIRStorageErrorCodeDownloadSizeExceeded:
            code = @"storage/download-size-exceeded";
            message = @"Size of the downloaded file exceeds the amount of memory allocated for the download.";
            break;
        case FIRStorageErrorCodeCancelled:
            code = @"storage/cancelled";
            message = @"User cancelled the operation.";
            break;
        default:
            break;
    }

    if (userInfo != nil && userInfo[@"data"]) {
        // errors with 'data' are unserializable - it breaks react so we send nil instead
        reject(code, message, nil);
    } else {
        reject(code, message, error);
    }
}


/**
 delete

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#delete
 @param NSString path
 */
RCT_EXPORT_METHOD(delete: (NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    FIRStorageReference *fileRef = [self getReference:path];

    [fileRef deleteWithCompletion:^(NSError * _Nullable error) {
        if (error != nil) {
            [self promiseRejectStorageException:reject error: error];
        } else {
            resolve([NSNull null]);
        }
    }];
}

/**
 getDownloadURL

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#getDownloadURL
 @param NSString path
 */
RCT_EXPORT_METHOD(getDownloadURL: (NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    FIRStorageReference *fileRef = [self getReference:path];

    [fileRef downloadURLWithCompletion:^(NSURL * _Nullable URL, NSError * _Nullable error) {
        if (error != nil) {
            [self promiseRejectStorageException:reject error: error];
        } else {
            resolve([URL absoluteString]);
        }
    }];
}

/**
 getMetadata

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#getMetadata
 @param NSString path
 */
RCT_EXPORT_METHOD(getMetadata: (NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    FIRStorageReference *fileRef = [self getReference:path];

    [fileRef metadataWithCompletion:^(FIRStorageMetadata * _Nullable metadata, NSError * _Nullable error) {
        if (error != nil) {
            [self promiseRejectStorageException:reject error: error];
        } else {
            resolve([metadata dictionaryRepresentation]);
        }
    }];
}

/**
 updateMetadata

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#updateMetadata
 @param NSString path
 @param NSDictionary metadata
 */
RCT_EXPORT_METHOD(updateMetadata: (NSString *) path metadata:(NSDictionary *) metadata resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    FIRStorageReference *fileRef = [self getReference:path];
    FIRStorageMetadata *firmetadata = [self buildMetadataFromMap:metadata];

    [fileRef updateMetadata:firmetadata completion:^(FIRStorageMetadata * _Nullable metadata, NSError * _Nullable error) {
        if (error != nil) {
            [self promiseRejectStorageException:reject error: error];
        } else {
            resolve([metadata dictionaryRepresentation]);
        }
    }];
}

/**
 downloadFile

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#downloadFile
 @param NSString path
 @param NSString localPath
 */
RCT_EXPORT_METHOD(downloadFile: (NSString *) path localPath:(NSString *) localPath resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    FIRStorageReference *fileRef = [self getReference:path];
    NSURL *localFile = [NSURL fileURLWithPath:localPath];
    FIRStorageDownloadTask *downloadTask = [fileRef writeToFile:localFile];

    // listen for state changes, errors, and completion of the download.
    [downloadTask observeStatus:FIRStorageTaskStatusResume handler:^(FIRStorageTaskSnapshot *snapshot) {
        // download resumed, also fires when the upload starts
        NSDictionary *event = [self getDownloadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];

    [downloadTask observeStatus:FIRStorageTaskStatusPause handler:^(FIRStorageTaskSnapshot *snapshot) {
        // download paused
        NSDictionary *event = [self getDownloadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];

    [downloadTask observeStatus:FIRStorageTaskStatusProgress handler:^(FIRStorageTaskSnapshot *snapshot) {
        // download reported progress
        NSDictionary *event = [self getDownloadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];

    [downloadTask observeStatus:FIRStorageTaskStatusSuccess handler:^(FIRStorageTaskSnapshot *snapshot) {
        // download completed successfully
        NSDictionary *resp = [self getDownloadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_DOWNLOAD_SUCCESS props:resp];
        resolve(resp);
    }];

    [downloadTask observeStatus:FIRStorageTaskStatusFailure handler:^(FIRStorageTaskSnapshot *snapshot) {
        // download task failed
        // TODO sendJSError event
        if (snapshot.error != nil) {
            [self promiseRejectStorageException:reject error:snapshot.error];
        }
    }];
}

/**
 setMaxDownloadRetryTime

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Storage#setMaxDownloadRetryTime
 @param NSNumber milliseconds
 */
RCT_EXPORT_METHOD(setMaxDownloadRetryTime:(NSNumber *) milliseconds) {
    [[FIRStorage storage] setMaxDownloadRetryTime:[milliseconds doubleValue]];
}

/**
 setMaxOperationRetryTime

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Storage#setMaxOperationRetryTime
 @param NSNumber milliseconds
 */
RCT_EXPORT_METHOD(setMaxOperationRetryTime:(NSNumber *) milliseconds) {
    [[FIRStorage storage] setMaxOperationRetryTime:[milliseconds doubleValue]];
}

/**
 setMaxUploadRetryTime

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Storage#setMaxUploadRetryTime
 */
RCT_EXPORT_METHOD(setMaxUploadRetryTime:(NSNumber *) milliseconds) {
    [[FIRStorage storage] setMaxUploadRetryTime:[milliseconds doubleValue]];
}

/**
 putFile

 @url https://firebase.google.com/docs/reference/js/firebase.storage.Reference#putFile
 @param NSString path
 @param NSString localPath
 @param NSDictionary metadata
 */
RCT_EXPORT_METHOD(putFile:(NSString *) path localPath:(NSString *)localPath metadata:(NSDictionary *)metadata resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if ([localPath hasPrefix:@"assets-library://"] || [localPath hasPrefix:@"ph://"]) {
        PHFetchResult* assets;

        if ([localPath hasPrefix:@"assets-library://"]) {
            NSURL *localFile = [[NSURL alloc] initWithString:localPath];
            assets = [PHAsset fetchAssetsWithALAssetURLs:@[localFile] options:nil];
        } else {
            NSString *assetId = [localPath substringFromIndex:@"ph://".length];
            assets = [PHAsset fetchAssetsWithLocalIdentifiers:@[assetId] options:nil];
        }

        PHAsset *asset = [assets firstObject];

        // this is based on http://stackoverflow.com/questions/35241449
        if (asset.mediaType == PHAssetMediaTypeImage) {
            // images
            PHImageRequestOptions *options = [PHImageRequestOptions new];
            options.networkAccessAllowed = true;
            [[PHImageManager defaultManager] requestImageDataForAsset:asset options:options resultHandler:^(NSData * imageData, NSString * dataUTI, UIImageOrientation orientation, NSDictionary * info) {
                if (info[PHImageErrorKey] == nil) {
                    if (UTTypeConformsTo((__bridge CFStringRef)dataUTI, kUTTypeJPEG)) {
                        [self uploadData:imageData metadata:metadata path:path resolver:resolve rejecter:reject];
                    } else {
                        // if the image UTI is not JPEG then convert to JPEG, e.g. HEI
                        CGImageSourceRef source = CGImageSourceCreateWithData((__bridge CFDataRef)imageData, NULL);
                        NSDictionary *imageInfo = (__bridge NSDictionary*)CGImageSourceCopyPropertiesAtIndex(source, 0, NULL);
                        NSDictionary *imageMetadata = [imageInfo copy];
                        NSMutableData *imageDataJPEG = [NSMutableData data];
                        CGImageDestinationRef destination = CGImageDestinationCreateWithData((__bridge CFMutableDataRef)imageDataJPEG, kUTTypeJPEG, 1, NULL);
                        CGImageDestinationAddImageFromSource(destination, source, 0, (__bridge CFDictionaryRef)imageMetadata);
                        CGImageDestinationFinalize(destination);

                        [self uploadData:[NSData dataWithData:imageDataJPEG] metadata:metadata path:path resolver:resolve rejecter:reject];
                    }
                } else {
                    reject(@"storage/request-image-data-failed", @"Could not obtain image data for the specified file.", nil);
                }
            }];
        } else if (asset.mediaType == PHAssetMediaTypeVideo) {
            // video
            PHVideoRequestOptions *options = [PHVideoRequestOptions new];
            options.networkAccessAllowed = true;
            [[PHImageManager defaultManager] requestExportSessionForVideo:asset options:options exportPreset:AVAssetExportPresetHighestQuality resultHandler:^(AVAssetExportSession * _Nullable exportSession, NSDictionary * _Nullable info) {
                if (info[PHImageErrorKey] == nil) {
                    NSURL *tempUrl = [self temporaryFileUrl];
                    exportSession.outputURL = tempUrl;

                    NSArray<PHAssetResource *> *resources = [PHAssetResource assetResourcesForAsset:asset];
                    for (PHAssetResource *resource in resources) {
                        exportSession.outputFileType = resource.uniformTypeIdentifier;
                        if (exportSession.outputFileType != nil) break;
                    }

                    [exportSession exportAsynchronouslyWithCompletionHandler:^{
                        if (exportSession.status == AVAssetExportSessionStatusCompleted) {
                            [self uploadFile:tempUrl metadata:metadata path:path resolver:resolve rejecter:reject];
                            // we're not cleaning up the temporary file at the moment, just relying on the OS to do that in it's own time - todo?
                        } else {
                            reject(@"storage/temporary-file-failure", @"Unable to create temporary file for upload.", nil);
                        }
                    }];
                } else {
                    reject(@"storage/export-session-failure", @"Unable to create export session for asset.", nil);
                }
            }];
        }
    } else {
        NSData *data = [[NSFileManager defaultManager] contentsAtPath:localPath];
        [self uploadData:data metadata:metadata path:path resolver:resolve rejecter:reject];
    }

}

- (NSURL *) temporaryFileUrl {
    NSString *filename = [NSString stringWithFormat:@"%@.tmp", [[NSProcessInfo processInfo] globallyUniqueString]];
    return [[NSURL fileURLWithPath:NSTemporaryDirectory()] URLByAppendingPathComponent:filename];
}

- (void) uploadFile:(NSURL *) url metadata:(NSDictionary *) metadata path:(NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject {
    FIRStorageReference *fileRef = [self getReference:path];
    FIRStorageMetadata *firmetadata = [self buildMetadataFromMap:metadata];
    FIRStorageUploadTask *uploadTask = [fileRef putFile:url metadata:firmetadata];
    [self addUploadObservers:uploadTask path:path resolver:resolve rejecter:reject];
}

- (void) uploadData:(NSData *) data metadata:(NSDictionary *) metadata path:(NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject{
    FIRStorageReference *fileRef = [self getReference:path];
    FIRStorageMetadata *firmetadata = [self buildMetadataFromMap:metadata];
    FIRStorageUploadTask *uploadTask = [fileRef putData:data metadata:firmetadata];
    [self addUploadObservers:uploadTask path:path resolver:resolve rejecter:reject];
}

- (void) addUploadObservers:(FIRStorageUploadTask *) uploadTask path:(NSString *) path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject{
    // listen for state changes, errors, and completion of the upload.
    [uploadTask observeStatus:FIRStorageTaskStatusResume handler:^(FIRStorageTaskSnapshot *snapshot) {
        // upload resumed, also fires when the upload starts
        NSDictionary *event = [self getUploadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];

    [uploadTask observeStatus:FIRStorageTaskStatusPause handler:^(FIRStorageTaskSnapshot *snapshot) {
        // upload paused
        NSDictionary *event = [self getUploadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];
    [uploadTask observeStatus:FIRStorageTaskStatusProgress handler:^(FIRStorageTaskSnapshot *snapshot) {
        // upload reported progress
        NSDictionary *event = [self getUploadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:event];
    }];

    [uploadTask observeStatus:FIRStorageTaskStatusSuccess handler:^(FIRStorageTaskSnapshot *snapshot) {
        // upload completed successfully
        NSDictionary *resp = [self getUploadTaskAsDictionary:snapshot];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_STATE_CHANGED props:resp];
        [self sendJSEvent:STORAGE_EVENT path:path title:STORAGE_UPLOAD_SUCCESS props:resp];
        resolve(resp);
    }];

    [uploadTask observeStatus:FIRStorageTaskStatusFailure handler:^(FIRStorageTaskSnapshot *snapshot) {
        if (snapshot.error != nil) {
            [self promiseRejectStorageException:reject error:snapshot.error];
        }
    }];
}

- (FIRStorageReference *)getReference:(NSString *)path {
    if ([path hasPrefix:@"url::"]) {
        NSString *url = [path substringFromIndex:5];
        return [[FIRStorage storage] referenceForURL:url];
    } else {
        return [[FIRStorage storage] referenceWithPath:path];
    }
}

- (NSDictionary *)getDownloadTaskAsDictionary:(FIRStorageTaskSnapshot *)task {
    return @{
             @"bytesTransferred": @(task.progress.completedUnitCount),
             @"ref": task.reference.fullPath,
             @"state": [self getTaskStatus:task.status],
             @"totalBytes": @(task.progress.totalUnitCount)
             };
}

- (NSDictionary *)getUploadTaskAsDictionary:(FIRStorageTaskSnapshot *)task {
    NSString *downloadUrl = [task.metadata.downloadURL absoluteString];
    FIRStorageMetadata *metadata = [task.metadata dictionaryRepresentation];
    return @{
             @"bytesTransferred": @(task.progress.completedUnitCount),
             @"downloadUrl": downloadUrl != nil ? downloadUrl : [NSNull null],
             @"metadata": metadata != nil ? metadata : [NSNull null],
             @"ref": task.reference.fullPath,
             @"state": [self getTaskStatus:task.status],
             @"totalBytes": @(task.progress.totalUnitCount)
             };
}

- (FIRStorageMetadata *)buildMetadataFromMap:(NSDictionary *)metadata {
    NSMutableDictionary *result = [metadata mutableCopy];
    result[@"metadata"] = metadata[@"customMetadata"];
    [result removeObjectForKey:@"customMetadata"];
    return [[FIRStorageMetadata alloc] initWithDictionary:result];
}

- (NSString *)getTaskStatus:(FIRStorageTaskStatus)status {
    if (status == FIRStorageTaskStatusResume || status == FIRStorageTaskStatusProgress) {
        return @"running";
    } else if (status == FIRStorageTaskStatusPause) {
        return @"paused";
    } else if (status == FIRStorageTaskStatusSuccess) {
        return @"success";
    } else if (status == FIRStorageTaskStatusFailure) {
        return @"error";
    } else {
        return @"unknown";
    }
}

- (NSString *)getPathForDirectory:(int)directory {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(directory, NSUserDomainMask, YES);
    return [paths firstObject];
}

- (NSDictionary *)constantsToExport {
    return @{
             @"MAIN_BUNDLE_PATH": [[NSBundle mainBundle] bundlePath],
             @"CACHES_DIRECTORY_PATH": [self getPathForDirectory:NSCachesDirectory],
             @"DOCUMENT_DIRECTORY_PATH": [self getPathForDirectory:NSDocumentDirectory],
             @"EXTERNAL_DIRECTORY_PATH": [NSNull null],
             @"EXTERNAL_STORAGE_DIRECTORY_PATH": [NSNull null],
             @"TEMP_DIRECTORY_PATH": NSTemporaryDirectory(),
             @"LIBRARY_DIRECTORY_PATH": [self getPathForDirectory:NSLibraryDirectory],
             @"FILETYPE_REGULAR": NSFileTypeRegular,
             @"FILETYPE_DIRECTORY": NSFileTypeDirectory
             };
}

- (NSArray<NSString *> *)supportedEvents {
    return @[STORAGE_EVENT, STORAGE_ERROR];
}

- (void) sendJSError:(NSError *) error withPath:(NSString *) path {
    NSDictionary *evt = @{ @"path": path, @"message": [error debugDescription] };
    [self sendJSEvent:STORAGE_ERROR path:path title:STORAGE_ERROR props: evt];
}

- (void) sendJSEvent:(NSString *)type path:(NSString *)path title:(NSString *)title props:(NSDictionary *)props {
    @try {
        [self sendEventWithName:type body:@{ @"eventName": title, @"path": path, @"body": props }];
    } @catch (NSException *err) {
        NSLog(@"An error occurred in sendJSEvent: %@", [err debugDescription]);
        NSLog(@"Tried to send: %@ with %@", title, props);
    }
}


@end

#else
@implementation RNFirebaseStorage
@end
#endif
