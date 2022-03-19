import { Component, OnInit } from '@angular/core';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrls: ['./livestream.component.scss']
})
export class LivestreamComponent implements OnInit {

  title = 'agora-video';
  localCallId = 'agora_local';
  remoteCallId = 'agora_remote';
  remoteCalls: string[] = [];
  globalStream!: Stream;
  private client!: AgoraClient;
  private localStream!: Stream;
  private uid!: number;
  currentTime = Math.floor(Date.now() / 1000);
  privilegeExpireTime = this.currentTime + 8400;
  tokenA!: string | null;
  role: string = "subscriber";
  showLocal: boolean = false;
  showRemote: boolean = false;
  constructor(private ngxAgoraService: NgxAgoraService) {

  }

  ngOnInit() {

  }

  // joining a remote channel as a subscriber
  remotejoin(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(this.tokenA, 'demo', this.uid, onSuccess, onFailure);
  }

  startStream() {

    this.uid =Math.floor(Math.random() * 100);
    console.log("Token With Integer Number Uid: ", this.tokenA);
    this.client = this.ngxAgoraService.createClient({ mode: 'live', codec: 'vp8' });
    this.assignClientHandlers();
    if (this.role == 'publisher') {
      console.log("the token from the token service is pulbiasher!!!!!!!!!", this.tokenA, this.role);
      this.tokenA = RtcTokenBuilder.buildTokenWithUid('9e17cc4e397e4d288d27abc2824354ae', '2883fd5d6b24492593d5d126ed17ea36', 'demo', this.uid, RtcRole.PUBLISHER, this.privilegeExpireTime);
      this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      this.assignLocalStreamHandlers();


      // Join and publish methods added in this step
      this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    }
    else {

      this.tokenA = RtcTokenBuilder.buildTokenWithUid('9e17cc4e397e4d288d27abc2824354ae', '2883fd5d6b24492593d5d126ed17ea36', 'demo', this.uid, RtcRole.SUBSCRIBER, this.privilegeExpireTime);
      console.log("the token from the token service is subscriber !!!!!!!!!", this.tokenA, this.role);
      this.remotejoin(() => this.join(uid => console.log("joined successfully"), error => console.error(error)));
    }
    console.log("called start stream");
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    console.log("the token id in the join method is", this.tokenA);
    this.client.join(this.tokenA, 'demo', this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {

      const stream = evt.stream as Stream;
      if(stream.hasVideo()){
        this.client.subscribe(stream, { audio: true, video: true }, err => {
          console.log('Subscribe stream failed', err);
        });
      }

    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      this.showRemote = true;
      const stream = evt.stream as Stream;
      this.globalStream = stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length && this.globalStream.isPlaying) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
      
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.showLocal = true;
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
  leave() {
    this.showLocal = false;
    this.showRemote = false;

    if (this.globalStream) {
      this.globalStream.close();

      this.remoteCalls = [];
      console.log(`Remote stream is removed ${this.globalStream.getId()}`);
    }
    else {
      this.localStream.close();
    }
  }



}
